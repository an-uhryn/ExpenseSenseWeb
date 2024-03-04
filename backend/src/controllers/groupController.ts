import { Request, Response } from 'express'
import { Group } from '../models/groupModel'
import { User } from '../models/userModel'

interface IUser extends Express.User {
  id: string
}

export const getAllGroups = async (req: Request, res: Response) => {
  try {
    const user: IUser = { id: '', ...req.user }

    const groups = await Group.find({ $or: [{ userId: user.id }, { 'members.id': user.id }] })

    res.status(200).json(groups)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

export const createGroup = async (req: Request, res: Response) => {
  try {
    const { name } = req.body
    const user: IUser = { id: '', ...req.user }
    const mainUser = await User.findOne({ id: user.id })

    const group = await Group.create({ name, userId: user.id, members: [mainUser] })

    res.status(201).json(group)
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

export const removeGroupMember = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { memberId } = req.body
    // TODO: add conditional that only owner or member can remove group member
    // const user: IUser = { id: '', ...req.user }

    const group = await Group.findOneAndUpdate(
      { _id: id, userId: { $ne: memberId } },
      { $pull: { members: { id: memberId } } },
    )

    res.status(201).json(group)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}
