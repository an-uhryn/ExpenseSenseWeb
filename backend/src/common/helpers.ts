import { Request } from 'express'

export interface IRequestUser extends Express.User {
  id: string
}

export function getUser(req: Request) {
  const user: IRequestUser = { id: '', ...req.user }
  return user
}
