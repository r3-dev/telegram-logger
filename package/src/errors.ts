export class BaseError extends Error {
  // @ts-ignore
  override readonly name: symbol
  readonly code: number
  readonly isOperational: boolean

  constructor(
    name: symbol,
    code: number,
    message: string,
    isOperational: boolean
  ) {
    super(message)
    Object.setPrototypeOf(this, new.target.prototype)

    this.name = name
    this.code = code
    this.isOperational = isOperational

    Error.captureStackTrace(this)
  }
}

export class APIError extends BaseError {
  constructor(
    name: symbol,
    code = 200,
    isOperational = true,
    description = 'OK'
  ) {
    super(name, code, description, isOperational)
  }
}
