import mongoose, { Document, Model } from 'mongoose'

const Schema = mongoose.Schema

export interface ITag extends Document {
  name: string
  color?: string
  userId: string
}

const tagSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: false,
      default: '#000',
    },
    userId: {
      type: String,
      required: true,
    },
    groupId: {
      type: String,
      required: false,
      default: '',
    },
  },
  { timestamps: true },
)

export const Tag: Model<ITag> = mongoose.model<ITag>('Tag', tagSchema)
