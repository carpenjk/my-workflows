import { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { CustomAPIError } from "../errors/customAPIError"

interface CustomError extends Error {
  statusCode?: number
}
export const errorHandler = (err: CustomError | CustomAPIError, req: Request, res: Response, next: NextFunction) => {
  let computedError = {
    statusCode: err.statusCode ? err.statusCode : StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong. Try again later.'
  }
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }
  return res.status(computedError.statusCode).json({ msg: computedError.msg })
}
