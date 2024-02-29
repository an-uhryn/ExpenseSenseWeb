import { Request, Response } from 'express'
import {Group, IGroup} from '../models/groupModel'
import {HydratedDocument} from "mongoose";

interface IUser extends Express.User {
  id: string
}

export const getAllGroups = async (req: Request, res: Response) => {
  try {
    const user: IUser = { id: '', ...req.user }

    const groups = await Group.find({userId: user.id})

    res.status(200).json(groups)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

export const createGroup = async (req: Request, res: Response) => {
  try {
    const { name } = req.body
    const user: IUser = { id: '', ...req.user }
    const groups: Array<HydratedDocument<IGroup, unknown, {}>> = await Group.find({userId: user.id}).exec()

    if (!groups.length) {
      const group = await Group.create({ name, userId: user.id })
      res.status(201).json(group)
    } else {
      res.status(400).json({ error: "You can't create more than one group." })
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

export const deleteGroupById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const group = await Group.findByIdAndDelete(id)

    if (!group) {
      res.status(404).json({ error: 'Group not found' })
      return
    }
    res.status(200).json(group)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

export const updateGroupById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const group = await Group.findOneAndUpdate({ _id: id }, { ...req.body })

    if (!group) {
      res.status(404).json({ error: 'Group not found' })
      return
    }
    res.status(201).json(group)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}
