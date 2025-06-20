'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamps = require('mongoose-timestamp')
const mongooseBeautifulUniqueValidation = require('mongoose-beautiful-unique-validation')

const InitiativeSchema = new Schema(
  {
    name: {
      type: String,
    },
    description: {
        type: String,
    },
    back: {
        type: String
    },
    backImage: {
      type: String
    },
    char1: {
      type: String
    },
    char2: {
      type: String
    },
    char3: {
      type: String
    },
    char4: {
      type: String
    },
  },
  {
    collection: 'initiatives'
  }
)

InitiativeSchema.plugin(timestamps, {
  createdAt: { index: true },
  updatedAt: { index: true }
})

InitiativeSchema.plugin(mongooseBeautifulUniqueValidation)

InitiativeSchema.index({
  name: 1
})

module.exports = mongoose.model('Initiative', InitiativeSchema)
