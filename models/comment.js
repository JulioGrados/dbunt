'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamps = require('mongoose-timestamp')
const mongooseBeautifulUniqueValidation = require('mongoose-beautiful-unique-validation')

const CommentSchema = new Schema(
  {
    text: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    date: {
        type: Date,
        default: Date.now
    },
    linked: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
  },
  {
    collection: 'comments'
  }
)

CommentSchema.plugin(timestamps, {
  createdAt: { index: true },
  updatedAt: { index: true }
})

CommentSchema.plugin(mongooseBeautifulUniqueValidation)

CommentSchema.index({
  text: 1
})

module.exports = mongoose.model('Comment', CommentSchema)
