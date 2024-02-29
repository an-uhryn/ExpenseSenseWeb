import mongoose, { Document, Model } from 'mongoose'

const Schema = mongoose.Schema

export interface IGroup extends Document {
  name: string
  userId: string,
  members: string[]
}

const groupSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    members: {
      type: Array,
      required: true,
      default: []
    }
  },
  { timestamps: true },
)

export const Group: Model<IGroup> = mongoose.model<IGroup>('Group', groupSchema)
