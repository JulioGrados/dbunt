'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamps = require('mongoose-timestamp')
const mongooseBeautifulUniqueValidation = require('mongoose-beautiful-unique-validation')

const PortfolioSchema = new Schema(
  {
    link: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String
    },
    team: {
        type: String
    },
    foundation: {
        type: String
    },
    level: {
        type: String
    },
    image: {
      type: String
    },
  },
  {
    collection: 'portfolios'
  }
)

PortfolioSchema.plugin(timestamps, {
  createdAt: { index: true },
  updatedAt: { index: true }
})

PortfolioSchema.plugin(mongooseBeautifulUniqueValidation)

PortfolioSchema.index({
  name: 1
})

module.exports = mongoose.model('Portfolio', PortfolioSchema)
