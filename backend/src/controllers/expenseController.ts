import { Request, Response } from 'express'
import { Expense } from '../models/expenseModel'

interface IUser extends Express.User {
  id: string
}

export const getAllExpenses = async (req: Request, res: Response) => {
  try {
    const expense = await Expense.find({})
    res.status(200).json(expense)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

export const createExpense = async (req: Request, res: Response) => {
  const { name, description, value, categoryId, tagIds } = req.body
  const user: IUser = { id: '', ...req.user }

  try {
    const expense = await Expense.create({
      name,
      description,
      value,
      categoryId,
      tagIds,
      userId: user.id,
    })
    res.status(201).json(expense)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

export const deleteExpenseById = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const expense = await Expense.findByIdAndDelete(id)
    if (!expense) {
      res.status(404).json({ error: 'Expense not found' })
      return
    }
    res.status(200).json(expense)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

export const updateExpenseById = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const expense = await Expense.findOneAndUpdate({ _id: id }, { ...req.body })
    if (!expense) {
      res.status(404).json({ error: 'Expense not found' })
      return
    }
    res.status(201).json(expense)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}
