import { IRequestUser } from '../common/helpers'
import { User } from '../models/userModel'

export const serializeUser = async (user: Express.User, done: any) => {
  done(null, user)

  const newUser: IRequestUser = { id: '', ...user }
  const existedUser = await User.findOne({ id: newUser.id })

  if (!existedUser) {
    await User.create(user)
  } else {
    await User.findOneAndUpdate({ id: newUser.id }, user)
  }
}

export const deserializeUser = (user: Express.User, done: any) => {
  done(null, user)
}

export const onSuccess = (req: any, res: any) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: 'Logged in.',
      user: req.user,
    })
  } else {
    res.status(403).json({
      error: true,
      message: 'Not authorized.',
    })
  }
}

export const onFailed = (req: any, res: any) => {
  res.status(401).json({
    error: true,
    message: 'Login failure.',
  })
}

export const logout = (req: any, res: any) => {
  req.logout(
    {
      keepSessionInfo: false,
    },
    (error: any) => {
      res.status(403).json({
        error: true,
        message: error?.message || 'Logout failed',
      })
      return
    },
  )
  res.status(201).json({
    error: false,
    message: 'Unauthorized',
  })
}
