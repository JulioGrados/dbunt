'use strict'

const Comment = require('../models/comment')

const { transformParams } = require('utils').transform

const count = async params => {
  const { query } = transformParams(params)
  const count = await Comment.countDocuments(query)
  return count
}

const list = async params => {
  const { query, select, populate, sort, limit, skip } = transformParams(params)

  const comments = await Comment.find(query, select)
    .populate(populate)
    .sort(sort)
    .limit(limit)
    .skip(skip)

  return comments
}

const create = async body => {
  try {
    const comment = await Comment.create(body)
    return await Comment.findById(comment._id).populate([
      { path: 'user linked' }
    ])
    return comment
  } catch (errorDB) {
    throw errorDB
  }
}

const update = async (commentId, body) => {
  const comment = await Comment.findOne({ _id: commentId })

  if (comment === null) {
    const error = {
      status: 404,
      message: 'El comment no se encontro'
    }

    throw error
  }

  try {
    const comment = await Comment.findOneAndUpdate(
      { _id: commentId },
      body,
      { new: true }
    )
    return comment
  } catch (errorDB) {
    throw errorDB
  }
}

const detail = async params => {
  const { query, select, populate } = transformParams(params)

  try {
    const comment = await Comment.findOne(query, select).populate(populate)

    if (comment === null) {
      const error = {
        status: 404,
        message: 'El comment no se encontro'
      }

      throw error
    }

    return comment
  } catch (errorDB) {
    throw errorDB
  }
}

const remove = async commentId => {
  const comment = await Comment.findOne({ _id: commentId })

  if (comment === null) {
    const error = {
      status: 404,
      message: 'El comment no se encontro'
    }

    throw error
  }

  try {
    await Comment.deleteOne({ _id: commentId })

    return comment
  } catch (errorDB) {
    throw errorDB
  }
}

module.exports = {
  count,
  list,
  create,
  update,
  detail,
  remove
}
