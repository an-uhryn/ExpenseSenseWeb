import express, { Router } from 'express'
import passport from 'passport'
import dotenv from 'dotenv'
import {
  deserializeUser,
  logout,
  onFailed,
  onSuccess,
  serializeUser,
} from '../controllers/authController'

dotenv.config()

const router: Router = express.Router()

passport.serializeUser(serializeUser)
passport.deserializeUser(deserializeUser)

router.get('/login/success', onSuccess)
router.get('/login/failed', onFailed)
router.get('/google/callback', passport.authenticate('google', {
  successRedirect: process.env.FRONTEND_HOST,
  failureRedirect: 'login/failed',
}))
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
router.get('/logout', logout)

export default router
