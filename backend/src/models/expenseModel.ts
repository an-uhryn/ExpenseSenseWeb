import mongoose, { Document, Model } from 'mongoose'

const Schema = mongoose.Schema

export interface IExpense extends Document {
  name: string
  description: string
  value: number
  categoryId: string
  tagIds?: []
}

const expenseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  categoryId: {
    type: String,
    required: true,
  },
  tagIds: {
    type: Array,
    required: false,
  }
}, { timestamps: true })

export const Expense: Model<IExpense> = mongoose.model<IExpense>('Expense', expenseSchema)
