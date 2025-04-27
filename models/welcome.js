'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamps = require('mongoose-timestamp')
const mongooseBeautifulUniqueValidation = require('mongoose-beautiful-unique-validation')

const WelcomeSchema = new Schema(
  {
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    questions: [
      {
        pregunta: String,
        respuesta: String,
      }
    ]
  },
  {
    collection: 'welcomes'
  }
)

WelcomeSchema.plugin(timestamps, {
  createdAt: { index: true },
  updatedAt: { index: true }
})

WelcomeSchema.plugin(mongooseBeautifulUniqueValidation)

WelcomeSchema.index({
    user: 1
})

module.exports = mongoose.model('Welcome', WelcomeSchema)
