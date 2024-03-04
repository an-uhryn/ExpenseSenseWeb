import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import passport from 'passport'
import cookieSession from 'cookie-session'
import categoriesRoutes from './routes/categories'
import tagRoutes from './routes/tags'
import expenseRoutes from './routes/expenses'
import groupRoutes from './routes/groups'
import invitationRoutes from './routes/invitations'
import authRouter from './routes/auth'
import './auth/passport'

dotenv.config()
const port = process.env.BACKEND_PORT || 4000

const app: Express = express()

app.use(
  cookieSession({
    name: 'session',
    keys: ['expenseSense'],
    maxAge: 24 * 60 * 60 * 100,
  }),
)
app.use(passport.initialize())
app.use(passport.session())
app.use(
  cors({
    origin: process.env.FRONTEND_HOST,
    methods: 'GET,POST,PATCH,DELETE,PUT',
    credentials: true,
  }),
)
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send('ExpenseSense server is running...')
})

app.use('/api/categories', categoriesRoutes)
app.use('/api/tags', tagRoutes)
app.use('/api/expenses', expenseRoutes)
app.use('/api/groups', groupRoutes)
app.use('/api/invitations', invitationRoutes)
app.use('/auth', authRouter)

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`)
    })
  })
  .catch((error: Error) => {
    console.log(error)
  })
