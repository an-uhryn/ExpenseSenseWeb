import { Request, Response } from 'express'
import { Category } from '../models/categoryModel'
import { Group } from '../models/groupModel'

interface IUser extends Express.User {
  id: string
}

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const user: IUser = { id: '', ...req.user }

    const category = await Category.find({ userId: user.id })

    res.status(200).json(category)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

export const getGroupCategories = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const user: IUser = { id: '', ...req.user }

    const group = await Group.findOne({ _id: id, 'members.id': user.id })

    if (group) {
      const category = await Category.find({ groupId: id })

      res.status(200).json(category)
    } else {
      res
        .status(404)
        .json({
          error: true,
          message: 'No such category or you are not a member of group which it belongs.',
        })
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, description, color, icon, groupId } = req.body
    const user: IUser = { id: '', ...req.user }

    const category = await Category.create({
      name,
      description,
      color,
      icon,
      userId: user.id,
      groupId,
    })

    res.status(201).json(category)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

export const deleteCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const category = await Category.findByIdAndDelete(id)

    if (!category) {
      res.status(404).json({ error: 'Category not found' })
      return
    }
    res.status(200).json(category)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

export const updateCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const category = await Category.findOneAndUpdate({ _id: id }, { ...req.body })

    if (!category) {
      res.status(404).json({ error: 'Category not found' })
      return
    }
    res.status(201).json(category)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}
