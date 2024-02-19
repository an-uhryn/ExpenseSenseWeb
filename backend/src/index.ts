import express, { Express, Request, Response } from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"
import categoriesRoutes from "./routes/categories"
import tagRoutes from "./routes/tags"
import expenseRoutes from "./routes/expenses"

dotenv.config()
const port = process.env.PORT || 4000

const app: Express = express()

app.use(express.json())
app.use(cors())

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server")
})

app.use('/api/categories', categoriesRoutes)
app.use('/api/tags', tagRoutes)
app.use('/api/expenses', expenseRoutes)

mongoose.connect(process.env.MONGO_URI as string).then(() => {
  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`)
  })
}).catch((error: Error) => {
  console.log(error)
})

