import type { TopicsRecord } from '@/types/pocketbase-types'
import type { APIContext } from 'astro'

import { bot } from '@/bot'
import { pb } from '@/bot/pocketbase'

export const POST = async (ctx: APIContext) => {
  const body = await ctx.request.json()

  if (!body.name) {
    return json('No "name" provided', 400)
  }

  if (!body.message) {
    return json('No "message" provided', 400)
  }

  try {
    const generalTopic = await pb
      .collection<TopicsRecord>('topics')
      .getFirstListItem(
        pb.filter('isGeneral = {:isGeneral}', { isGeneral: true })
      )

    const logsTopic = await pb
      .collection<TopicsRecord>('topics')
      .getFirstListItem(pb.filter('name = {:name}', { name: body.name }))

    await bot.api.sendMessage(
      generalTopic.chatOrTopicId!,
      `${body.code ? `Code: ${body.code}\n` : ''}Message: ${body.message}${
        body.stack ? `\n<pre language="bash">${body.stack}</pre>` : ''
      }`,
      {
        message_thread_id: logsTopic.chatOrTopicId,
        parse_mode: 'HTML'
      }
    )
    return json('OK', 200)
  } catch (err) {
    return json((err as Error).message, 500)
  }
}

function json(message: string, status = 200): Response {
  return new Response(JSON.stringify({ message }), {
    status,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
