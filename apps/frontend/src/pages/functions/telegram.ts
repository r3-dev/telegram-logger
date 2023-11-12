import { webhookCallback } from 'grammy'
import type { APIContext } from 'astro'

import { bot } from '@/bot'

export const POST = async (ctx: APIContext) => {
  return await webhookCallback(
    bot,
    'cloudflare-mod',
    'throw',
    59000,
    import.meta.env.TELEGRAM_WEBHOOK_SECRET
  )(ctx.request)
}
