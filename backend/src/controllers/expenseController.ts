import { Request, Response } from 'express'
import { Expense } from '../models/expenseModel'
import { Group } from '../models/groupModel'
import { getUser } from '../common/helpers'

export const getAllExpenses = async (req: Request, res: Response) => {
  try {
    const user = getUser(req)
    const expense = await Expense.find({ userId: user.id })
    res.status(200).json(expense)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

export const getGroupExpenses = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const user = getUser(req)
    const group = await Group.findOne({ _id: id, 'members.id': user.id })

    if (group) {
      const expense = await Expense.find({ groupId: id })
      res.status(200).json(expense)
    } else {
      res.status(404).json({ error: true, message: 'No such group or you are not a member.' })
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

export const createExpense = async (req: Request, res: Response) => {
  try {
    const { name, description, value, categoryId, tagIds, groupId } = req.body
    const user = getUser(req)
    const expense = await Expense.create({
      name,
      description,
      value,
      categoryId,
      tagIds,
      userId: user.id,
      groupId,
    })

    res.status(201).json(expense)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

export const deleteExpenseById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
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
  try {
    const { id } = req.params
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
