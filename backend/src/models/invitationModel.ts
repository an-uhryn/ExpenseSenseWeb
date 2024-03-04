import mongoose, { Document, Model } from 'mongoose'

const Schema = mongoose.Schema

export interface IInvitation extends Document {
  inviter: string
  invitee: string
  groupId: string
}

const invitationSchema = new Schema(
  {
    inviter: {
      type: String,
      required: true,
    },
    invitee: {
      type: String,
      required: true,
    },
    groupId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

export const Invitation: Model<IInvitation> = mongoose.model<IInvitation>(
  'Invitation',
  invitationSchema,
)
