import { Bot, Context } from 'grammy'
import type { TopicsRecord } from '@/types/pocketbase-types'

import { pb } from './pocketbase'

export const bot = new Bot(import.meta.env.TELEGRAM_BOT_TOKEN)

await bot.api.setMyCommands([
  {
    command: 'start',
    description: 'Init bot'
  },
  {
    command: 'create_topic',
    description: 'Create a topic'
  },
  {
    command: 'delete_topic',
    description: 'Delete a topic'
  }
])

function forumMiddleware(ctx: Context, next: () => void) {
  if (ctx.chat?.type === 'supergroup' && ctx.chat.is_forum) {
    return next()
  }

  ctx.reply('Please use this command in a forum chat')
}

bot.use(forumMiddleware)

const supergroup = bot.chatType('supergroup')

supergroup.command('start', async (ctx) => {
  try {
    await pb
      .collection<TopicsRecord>('topics')
      .getFirstListItem(
        pb.filter('chatOrTopicId = {:chatOrTopicId}', { chatOrTopicId: ctx.chat.id })
      )
    await ctx.reply('Bot is already inited')
    return
  } catch {}

  try {
    await pb.collection('topics').create<TopicsRecord>({
      name: ctx.chat.title,
      chatOrTopicId: ctx.chat.id,
      isGeneral: true,
      logs: []
    })
    await ctx.reply('Bot inited successfully')
  } catch (err) {
    await ctx.reply((err as Error).message)
  }
})

const generalTopic = supergroup.filter((ctx) => {
  return !ctx.message?.message_thread_id
})

generalTopic.command('create_topic', async (ctx) => {
  if (!ctx.match) {
    await ctx.reply('Please specify topic name')
    return
  }

  if (ctx.match.length > 128) {
    await ctx.reply('Topic name is too long')
    return
  }

  try {
    await pb
      .collection<TopicsRecord>('topics')
      .getFirstListItem(pb.filter('name = {:name}', { name: ctx.match }))
    await ctx.reply('Topic is already created')
    return
  } catch {}

  try {
    const topic = await bot.api.createForumTopic(ctx.chat.id, ctx.match)
    const res = await pb.collection<TopicsRecord>('topics').create({
      name: ctx.match,
      apiKey: crypto.randomUUID(),
      chatOrTopicId: topic.message_thread_id,
      general: false
    })
    await ctx.reply('Topic created successfully')
    const messageTopicInfo = await bot.api.sendMessage(
      ctx.chat.id,
      `Original name: ${res.name}\nTopic id: ${res.chatOrTopicId}`,
      {
        parse_mode: 'HTML',
        message_thread_id: topic.message_thread_id
      }
    )
    await bot.api.pinChatMessage(
      ctx.chat.id,
      messageTopicInfo.message_id
    )
  } catch (err) {
    await ctx.reply((err as Error).message)
  }
})

generalTopic.command('delete_topic', async (ctx) => {
  if (!ctx.match) {
    await ctx.reply('Please specify topic name')
    return
  }

  try {
    const topic = await pb
      .collection('topics')
      .getFirstListItem(pb.filter('name = {:name}', { name: ctx.match }))

    await pb.collection<TopicsRecord>('topics').delete(topic.id)
    await bot.api.deleteForumTopic(ctx.chat.id, topic.chatOrTopicId)
    await ctx.reply('Topic deleted successfully')
  } catch {
    await ctx.reply('Topic not found')
  }
})
