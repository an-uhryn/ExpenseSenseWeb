import mongoose, { Document, Model } from 'mongoose'

const Schema = mongoose.Schema

export interface IUser extends Document {
  displayName: string
  emails: []
  id: string
  name: { familyName: string; givenName: string }
  photos: { value: string }[]
  provider: string
  _json?: any
  _raw?: string
}

const userSchema = new Schema(
  {
    displayName: {
      type: String,
      required: true,
    },
    emails: {
      type: Array,
      required: false,
    },
    id: {
      type: String,
      required: true,
    },
    name: {
      type: Object,
      required: true,
    },
    photos: {
      type: Array,
      required: false,
    },
    provider: {
      type: String,
      required: false,
    },
    _json: {
      type: Object,
      required: false,
    },
    _raw: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
)

export const User: Model<IUser> = mongoose.model<IUser>('User', userSchema)
