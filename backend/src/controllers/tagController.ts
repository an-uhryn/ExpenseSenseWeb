import { Request, Response } from 'express'
import { Tag } from '../models/tagModel'
import { Group } from '../models/groupModel'

interface IUser extends Express.User {
  id: string
}

export const getAllTags = async (req: Request, res: Response) => {
  try {
    const user: IUser = { id: '', ...req.user }

    const tag = await Tag.find({ userId: user.id })

    res.status(200).json(tag)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

export const getGroupTags = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const user: IUser = { id: '', ...req.user }

    const group = await Group.findOne({ _id: id, 'members.id': user.id })

    if (group) {
      const category = await Tag.find({ groupId: id })

      res.status(200).json(category)
    } else {
      res
        .status(404)
        .json({
          error: true,
          message: 'No such tag or you are not a member of group which it belongs.',
        })
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

export const createTag = async (req: Request, res: Response) => {
  try {
    const { name, color, groupId } = req.body
    const user: IUser = { id: '', ...req.user }

    const tag = await Tag.create({ name, color, userId: user.id, groupId })

    res.status(201).json(tag)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

export const deleteTagById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const tag = await Tag.findByIdAndDelete(id)

    if (!tag) {
      res.status(404).json({ error: 'Tag not found' })
      return
    }
    res.status(200).json(tag)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

export const updateTagById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const tag = await Tag.findOneAndUpdate({ _id: id }, { ...req.body })

    if (!tag) {
      res.status(404).json({ error: 'Tag not found' })
      return
    }
    res.status(201).json(tag)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}
