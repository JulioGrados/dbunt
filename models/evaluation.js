'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamps = require('mongoose-timestamp')
const mongooseBeautifulUniqueValidation = require('mongoose-beautiful-unique-validation')

const EvaluationSchema = new Schema(
  {
    title: {
      type: String,
    },
    position: {
        type: String,
    },
    experiment: {
        type: String,
    },
    process: {
        type: String,
        default: 'Testing'
    },
    processWhy: {
        type: String
    },
    dont: {
        type: Number,
        default: 0
    },
    nice: {
        type: Number,
        default: 0
    },
    must: {
        type: Number,
        default: 0
    },
    file: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    color: {
      type: String
    },
    parent: { 
        type: Schema.Types.ObjectId, 
        ref: 'Evaluation', 
        default: null 
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    collection: 'evaluations'
  }
)

EvaluationSchema.plugin(timestamps, {
  createdAt: { index: true },
  updatedAt: { index: true }
})

EvaluationSchema.plugin(mongooseBeautifulUniqueValidation)

EvaluationSchema.index({
  title: 1
})

module.exports = mongoose.model('Evaluation', EvaluationSchema)
