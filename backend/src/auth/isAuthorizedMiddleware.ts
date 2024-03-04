import { NextFunction, Request, Response } from 'express'

export const isAuthorizedMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.user) {
    next()
  } else {
    res.status(401).json({ message: 'Unauthorized' })
  }
}
