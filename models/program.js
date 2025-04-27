'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamps = require('mongoose-timestamp')
const mongooseBeautifulUniqueValidation = require('mongoose-beautiful-unique-validation')

const ProgramSchema = new Schema(
  {
    name: {
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
    collection: 'programs'
  }
)

ProgramSchema.plugin(timestamps, {
  createdAt: { index: true },
  updatedAt: { index: true }
})

ProgramSchema.plugin(mongooseBeautifulUniqueValidation)

ProgramSchema.index({
  name: 1
})

module.exports = mongoose.model('Program', ProgramSchema)
