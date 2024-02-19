import mongoose from 'mongoose'

const Schema = mongoose.Schema

const tagSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: false,
    default: '#000'
  },
}, { timestamps: true })

module.exports = mongoose.model('Tag', tagSchema)
