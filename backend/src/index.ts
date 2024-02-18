import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
var cors = require('cors');

dotenv.config();
const port = process.env.PORT || 4000;

const app: Express = express();
const mongoose = require('mongoose');
const categoriesRoutes = require('./routes/categories')


app.use(express.json())
app.use(cors())

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use('/api/categories', categoriesRoutes);

mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
}).catch((error: Error) => {
  console.log(error)
})

