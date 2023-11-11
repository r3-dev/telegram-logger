/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    pb: import('pocketbase').default
  }
}

interface ImportMetaEnv {
  readonly INTERNAL_BACKEND_URL: string
  readonly TELEGRAM_BOT_TOKEN: string
  readonly TELEGRAM_WEBHOOK_SECRET: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
