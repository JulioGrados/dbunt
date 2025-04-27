'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamps = require('mongoose-timestamp')
const mongooseBeautifulUniqueValidation = require('mongoose-beautiful-unique-validation')

const PageSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    page: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    description: {
      type: String
    },
    image: {
      type: String
    },
  },
  {
    collection: 'pages'
  }
)

PageSchema.plugin(timestamps, {
  createdAt: { index: true },
  updatedAt: { index: true }
})

PageSchema.plugin(mongooseBeautifulUniqueValidation)

PageSchema.index({
  name: 1
})

module.exports = mongoose.model('Page', PageSchema)
