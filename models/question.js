'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamps = require('mongoose-timestamp')
const mongooseBeautifulUniqueValidation = require('mongoose-beautiful-unique-validation')

const QuestionSchema = new Schema(
  {
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    questions: [
      {
        modulo: String,
        numero: Number,
        preguntas: []
      }
    ]
  },
  {
    collection: 'questions'
  }
)

QuestionSchema.plugin(timestamps, {
  createdAt: { index: true },
  updatedAt: { index: true }
})

QuestionSchema.plugin(mongooseBeautifulUniqueValidation)

QuestionSchema.index({
    user: 1
})

module.exports = mongoose.model('Question', QuestionSchema)
