import { webhookCallback } from 'grammy'
import { bot } from '@/bot'
import type { APIContext } from 'astro'

export const POST = async (ctx: APIContext) => {
  return await webhookCallback(
    bot,
    'cloudflare-mod',
    'throw',
    59000,
    import.meta.env.TELEGRAM_WEBHOOK_SECRET
  )(ctx.request)
}
