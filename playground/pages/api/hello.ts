import { ApiError } from '@r3-dev/telegram-logger'
import type { NextApiRequest, NextApiResponse } from 'next'

import { errorHandler, nextjsSymbol } from '@/logger'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // @ts-expect-error
    JSON.parsec('{')
  } catch (err) {
    await errorHandler.captureError(err)
  }

  try {
    throw new ApiError(nextjsSymbol, 500, 'Internal server error')
  } catch (err) {
    await errorHandler.captureError(err)
  }

  res.json({ ok: true })
}
