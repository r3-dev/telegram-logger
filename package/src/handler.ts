import { BaseError } from './errors.js'
import { symbolToString } from './utils.js'

const LOGGER_URL = 'http://localhost:4321/functions/logger'

export class ErrorHandler {
  private readonly name: string
  constructor(name: string | symbol, private readonly isDev: boolean) {
    this.name = symbolToString(name)
    process.on('', async (error: BaseError) => {
      if (!this.isValidError(error)) return
      await this.captureError(error)
      if (!this.isTrustedError(error)) {
        process.exit(1)
      }
    })
  }

  async captureError(error: unknown): Promise<void> {
    if (!(error instanceof Error)) {
      console.log('Error is not captured:', error)
      return
    }

    await fetch(LOGGER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.name,
        // @ts-ignore
        code: error.code,
        message: error.message,
        stack: error.stack
      })
    })
  }

  private isTrustedError(error: Error) {
    if (error instanceof BaseError) return error.isOperational
    return false
  }

  private isValidError(error: Error) {
    if (error.name !== this.name || this.isDev) return false
    return true
  }
}

process.on('unhandledRejection', (reason: Error) => {
  throw reason
})
