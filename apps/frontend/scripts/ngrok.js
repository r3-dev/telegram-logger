import 'dotenv/config'

import { Bot } from 'grammy'
import ngrok from 'ngrok'

const botToken = process.env.TELEGRAM_BOT_TOKEN
const webhookSecret = process.env.TELEGRAM_WEBHOOK_SECRET

function exitWithError(message) {
  console.error(message)
  process.exit(1)
}

if (!botToken) {
  exitWithError('Please provide a bot token as an environment variable.')
}

if (!webhookSecret) {
  exitWithError('Please provide a webhook secret as an environment variable.')
}

const ngrokHost = await ngrok.connect(3001)
console.log('Ngrok host:', ngrokHost)

try {
  const bot = new Bot(botToken)
  await bot.api.setWebhook(`${ngrokHost}/functions/telegram`, {
    secret_token: webhookSecret,
    drop_pending_updates: true
  })

  const webhookInfo = await bot.api.getWebhookInfo()
  console.log('Webhook set successfully:', webhookInfo.url)

  const botInfo = await bot.api.getMe()
  console.log('Bot info:', botInfo.username)
} catch (error) {
  exitWithError('Failed to set webhook:', error)
}
