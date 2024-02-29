import mongoose, { Document, Model } from 'mongoose'

const Schema = mongoose.Schema

export interface IInvitation extends Document {
  name: string
  inviter: string
  invitee: string
  groupId: string
}

const invitationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
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
    }
  },
  { timestamps: true },
)

export const Invitation: Model<IInvitation> = mongoose.model<IInvitation>('Invitation', invitationSchema)
