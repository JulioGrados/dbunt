'use strict'

const Interview = require('../models/interview')

const { transformParams } = require('utils').transform

const count = async params => {
  const { query } = transformParams(params)
  const count = await Interview.countDocuments(query)
  return count
}

const list = async params => {
  const { query, select, populate, sort, limit, skip } = transformParams(params)

  const interviews = await Interview.find(query, select)
    .populate(populate)
    .sort(sort)
    .limit(limit)
    .skip(skip)

  return interviews
}

const create = async body => {
  try {
    const interview = await Interview.create(body)
    return await Interview.findById(interview._id).populate([
      { path: 'user parent' }
    ])
    return interview
  } catch (errorDB) {
    throw errorDB
  }
}

const update = async (interviewId, body) => {
  const interview = await Interview.findOne({ _id: interviewId })

  if (interview === null) {
    const error = {
      status: 404,
      message: 'El interview no se encontro'
    }

    throw error
  }

  try {
    const interview = await Interview.findOneAndUpdate(
      { _id: interviewId },
      body,
      { new: true }
    )
    return interview
  } catch (errorDB) {
    throw errorDB
  }
}

const detail = async params => {
  const { query, select, populate } = transformParams(params)

  try {
    const interview = await Interview.findOne(query, select).populate(populate)

    if (interview === null) {
      const error = {
        status: 404,
        message: 'El interview no se encontro'
      }

      throw error
    }

    return interview
  } catch (errorDB) {
    throw errorDB
  }
}

const remove = async interviewId => {
  const interview = await Interview.findOne({ _id: interviewId })

  if (interview === null) {
    const error = {
      status: 404,
      message: 'El interview no se encontro'
    }

    throw error
  }

  try {
    await Interview.deleteOne({ _id: interviewId })

    return interview
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
