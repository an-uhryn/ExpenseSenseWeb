import { Request, Response } from 'express'
import { Invitation } from '../models/invitationModel'
import { User } from '../models/userModel'
import { Group } from '../models/groupModel'
import { getUser } from '../common/helpers'

export const getAllInvitations = async (req: Request, res: Response) => {
  try {
    const user = getUser(req)
    const invitation = await Invitation.find({ inviter: user.id })
    res.status(200).json(invitation)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

export const getAllInvitationsById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const user = getUser(req)

    if (id === user.id) {
      const invitation = await Invitation.find({ invitee: id })
      res.status(200).json(invitation)
    } else {
      res.status(401).json({ error: 'You are not allowed to get invitations of different user.' })
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

export const createInvitation = async (req: Request, res: Response) => {
  try {
    const { invitee, groupId } = req.body
    const user = getUser(req)
    const userExists = await User.findOne({ id: invitee })

    if (userExists) {
      const userIsAlreadyAMemberOfThisGroup = await Group.findOne({
        _id: groupId,
        'members.id': invitee,
      })

      if (userIsAlreadyAMemberOfThisGroup) {
        res.status(401).json({ error: true, message: 'User is already a member of that group.' })
      } else {
        await Invitation.create({ invitee, groupId, inviter: user.id })
        res.status(201).json({ error: 'Invitation created.' })
      }
    } else {
      res.status(404).json({ error: 'User does not exist' })
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

export const acceptInvitationById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { groupId } = req.body
    const user = getUser(req)
    const query = {
      _id: id,
      invitee: user.id,
    }
    const userIsAlreadyAMemberOfThisGroup = await Group.findOne({
      _id: groupId,
      'members.id': user.id,
    })

    if (userIsAlreadyAMemberOfThisGroup) {
      await Invitation.findByIdAndDelete(query)
      res.status(401).json({ error: true, message: 'User is already a member of that group.' })
      return
    }

    const invitation = await Invitation.findOne(query)

    if (invitation) {
      const invitee = await User.findOne({ id: user.id })
      await Group.findOneAndUpdate({ _id: groupId }, { $push: { members: invitee } }, { new: true })
      await Invitation.findByIdAndDelete(query)
    } else {
      res.status(401).json({ error: 'Something went wrong' })
      return
    }

    res.status(201).json({ error: false, message: 'Added to a group' })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

export const deleteInvitationById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const user = getUser(req)
    const query = {
      _id: id,
      $or: [{ inviter: user.id }, { invitee: user.id }],
    }
    const invitation = await Invitation.findOneAndDelete(query)

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
