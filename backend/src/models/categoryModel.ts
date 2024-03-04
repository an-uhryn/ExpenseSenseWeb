import mongoose, { Document, Model } from 'mongoose'

const Schema = mongoose.Schema

export interface ICategory extends Document {
  name: string
  description: string
  icon: string
  color?: string
  userId: string
}

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    icon: {
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

export const Category: Model<ICategory> = mongoose.model<ICategory>('Category', categorySchema)
