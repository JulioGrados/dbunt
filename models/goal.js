'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamps = require('mongoose-timestamp')
const mongooseBeautifulUniqueValidation = require('mongoose-beautiful-unique-validation')

const GoalSchema = new Schema(
  {
    name: {
      type: String,
    },
    number: {
        type: String,
    },
    description: {
        type: String,
    },
    image: {
      type: String
    },
  },
  {
    collection: 'goals'
  }
)

GoalSchema.plugin(timestamps, {
  createdAt: { index: true },
  updatedAt: { index: true }
})

GoalSchema.plugin(mongooseBeautifulUniqueValidation)

GoalSchema.index({
  name: 1
})

module.exports = mongoose.model('Goal', GoalSchema)
