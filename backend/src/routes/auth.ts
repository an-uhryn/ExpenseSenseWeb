import express, { Router } from 'express'
import passport from 'passport'
import dotenv from 'dotenv'
import { User } from '../models/userModel'

dotenv.config()

const router: Router = express.Router()

interface IUser extends Express.User {
  id: string
}

passport.serializeUser(async (user: Express.User, done) => {
  done(null, user)

  const newUser: IUser = { id: '', ...user }
  const existedUser = await User.findOne({ id: newUser.id })

  if (!existedUser) {
    await User.create(user)
  } else {
    await User.findOneAndUpdate({ id: newUser.id }, user)
  }
})

passport.deserializeUser((user: Express.User, done) => {
  done(null, user)
})

router.get('/login/success', (req, res) => {
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
})

router.get('/login/failed', (req, res) => {
  res.status(401).json({
    error: true,
    message: 'Login failure.',
  })
})

router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: `http://localhost:${process.env.FRONTEND_PORT || '3000'}`,
    failureRedirect: 'login/failed',
  }),
)

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get('/logout', (req, res) => {
  req.logout(
    {
      keepSessionInfo: false,
    },
    (error) => {
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
})

export default router
