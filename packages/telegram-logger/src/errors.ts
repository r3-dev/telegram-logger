import { symbolToString } from './utils.js'

export class BaseError extends Error {
  override readonly name: string
  override readonly stack?: string
  readonly isOperational: boolean

  constructor(
    name: symbol | string,
    message: string,
    stack?: string,
    isOperational = true
  ) {
    super(message)
    Object.setPrototypeOf(this, new.target.prototype)

    this.name = symbolToString(name)
    this.stack = stack
    this.isOperational = isOperational

    Error.captureStackTrace(this)
  }
}

export class ApiError extends BaseError {
  code: number

  constructor(
    name: string | symbol,
    code = 200,
    message = 'OK',
    stack?: string,
    isOperational?: boolean
  ) {
    super(name, message, stack, isOperational)
    this.code = code
  }
}
