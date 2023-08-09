import { NextFunction, Request, Response } from "express"

export type RequestCallbackFn = (req: Request, res: Response, next: NextFunction) => void;

export const asyncWrapper = (fn: RequestCallbackFn): RequestCallbackFn => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next)
    } catch (error) {
      console.log("🚀 ~ file: asyncWrapper.ts:10 ~ return ~ error:", error)
      next(error)
    }
  }
}