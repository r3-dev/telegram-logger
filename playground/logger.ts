import { ErrorHandler } from '@r3-dev/telegram-logger'

export const nextjsSymbol = Symbol('nextjs')
export const errorHandler = new ErrorHandler(nextjsSymbol, false)
