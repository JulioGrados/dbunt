'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamps = require('mongoose-timestamp')
const mongooseBeautifulUniqueValidation = require('mongoose-beautiful-unique-validation')

const InterviewSchema = new Schema(
  {
    company: {
      type: String,
    },
    load: {
        type: String,
    },
    name: {
        type: String,
    },
    engagement: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
    keys: {
        type: String
    },
    description: {
        type: String
    },
    file: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    evaluations: [
        {
            parent: { 
                type: Schema.Types.ObjectId, 
                ref: 'Evaluation', 
                default: null 
            },
            dont: {
                type: Boolean,
                default: false
            },
            nice: {
                type: Boolean,
                default: false
            },
            must: {
                type: Boolean,
                default: false
            },
        }
    ]
  },
  {
    collection: 'interviews'
  }
)

InterviewSchema.plugin(timestamps, {
  createdAt: { index: true },
  updatedAt: { index: true }
})

InterviewSchema.plugin(mongooseBeautifulUniqueValidation)

InterviewSchema.index({
  name: 1
})

module.exports = mongoose.model('Interview', InterviewSchema)
