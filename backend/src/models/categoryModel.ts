const mongoose = require('mongoose')

const Schema = mongoose.Schema

const categorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: false,
    default: '#000'
  },
}, { timestamps: true })

module.exports = mongoose.model('Category', categorySchema)
