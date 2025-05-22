'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamps = require('mongoose-timestamp')
const mongooseBeautifulUniqueValidation = require('mongoose-beautiful-unique-validation')

const UploadSchema = new Schema(
  {
    file: {
      type: String
    },
    name: {
      type: String
    },
    text: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now
    },
    linked: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    collection: 'uploads'
  }
)

UploadSchema.plugin(timestamps, {
  createdAt: { index: true },
  updatedAt: { index: true }
})

UploadSchema.plugin(mongooseBeautifulUniqueValidation)

UploadSchema.index({
  name: 1,
  date: 1
})

module.exports = mongoose.model('Upload', UploadSchema)