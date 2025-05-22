'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamps = require('mongoose-timestamp')
const mongooseBeautifulUniqueValidation = require('mongoose-beautiful-unique-validation')

const TeamSchema = new Schema(
  {
    names: {
      type: String,
    },
    description: {
      type: String
    },
    photo: {
      type: String
    }
  },
  {
    collection: 'teams'
  }
)

TeamSchema.plugin(timestamps, {
  createdAt: { index: true },
  updatedAt: { index: true }
})

TeamSchema.plugin(mongooseBeautifulUniqueValidation)

TeamSchema.index({
  names: 1,
})

module.exports = mongoose.model('Team', TeamSchema)
