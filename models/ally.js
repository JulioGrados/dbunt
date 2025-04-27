'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamps = require('mongoose-timestamp')
const mongooseBeautifulUniqueValidation = require('mongoose-beautiful-unique-validation')

const AllySchema = new Schema(
  {
    name: {
      type: String,
    },
    image: {
      type: String
    },
  },
  {
    collection: 'allys'
  }
)

AllySchema.plugin(timestamps, {
  createdAt: { index: true },
  updatedAt: { index: true }
})

AllySchema.plugin(mongooseBeautifulUniqueValidation)

AllySchema.index({
  name: 1
})

module.exports = mongoose.model('Ally', AllySchema)
