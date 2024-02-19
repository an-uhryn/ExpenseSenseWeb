import mongoose from "mongoose";

const Schema = mongoose.Schema

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

module.exports = mongoose.model('Expense', expenseSchema)
