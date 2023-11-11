import { BaseError } from './errors.js'

const LOGGER_URL = 'http://localhost:4321/functions/logger'

export class ErrorHandler {
  constructor(private readonly name: symbol) {
    process.on('uncaughtException', async (error: BaseError) => {
      if (!this.isValidError(error)) return
      await this.reportError(error)
      if (!this.isTrustedError(error)) {
        process.exit(1)
      }
    })
  }

  private async reportError(error: BaseError): Promise<void> {
    if (this.isValidError(error)) {
      console.log('Error is not valid:', error)
      return
    }

    await fetch(LOGGER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: error.name,
        code: error.code,
        message: error.message
      })
    })
  }

  private isTrustedError(error: BaseError) {
    if (error instanceof BaseError) return error.isOperational
    return false
  }

  private isValidError(error: BaseError) {
    const isDev = process.env['NODE_ENV'] === 'development'
    if (error.name !== this.name || isDev) return false
    return true
  }
}

process.on('unhandledRejection', (reason: Error) => {
  throw reason
})
