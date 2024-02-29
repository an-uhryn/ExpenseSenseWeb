import { Request, Response } from 'express'
import { Invitation } from '../models/invitationModel'

interface IUser extends Express.User {
  id: string
}

export const getAllInvitations = async (req: Request, res: Response) => {
  try {
    const user: IUser = { id: '', ...req.user }

    const invitation = await Invitation.find({invitee: user.id})

    res.status(200).json(invitation)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

export const createInvitation = async (req: Request, res: Response) => {
  try {
    const { name, invitee, groupId } = req.body
    const user: IUser = { id: '', ...req.user }

    const invitation = await Invitation.create({ name, invitee, groupId, inviter: user.id })

    res.status(201).json(invitation)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

export const deleteInvitationById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const invitation = await Invitation.findByIdAndDelete(id)

    if (!invitation) {
      res.status(404).json({ error: 'Invitation not found' })
      return
    }
    res.status(200).json(invitation)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

export const updateInvitationById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const invitation = await Invitation.findOneAndUpdate({ _id: id }, { ...req.body })

    if (!invitation) {
      res.status(404).json({ error: 'Invitation not found' })
      return
    }
    res.status(201).json(invitation)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}
