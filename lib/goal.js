'use strict'

const Goal = require('../models/goal')

const { transformParams } = require('utils').transform

const count = async params => {
  const { query } = transformParams(params)
  const count = await Goal.countDocuments(query)
  return count
}

const list = async params => {
  const { query, select, populate, sort, limit, skip } = transformParams(params)

  const goals = await Goal.find(query, select)
    .populate(populate)
    .sort(sort)
    .limit(limit)
    .skip(skip)

  return goals
}

const create = async body => {
  try {
    const goal = await Goal.create(body)
    return goal
  } catch (errorDB) {
    throw errorDB
  }
}

const update = async (goalId, body) => {
  const goal = await Goal.findOne({ _id: goalId })

  if (goal === null) {
    const error = {
      status: 404,
      message: 'El goal no se encontro'
    }

    throw error
  }

  try {
    const goal = await Goal.findOneAndUpdate(
      { _id: goalId },
      body,
      { new: true }
    )
    return goal
  } catch (errorDB) {
    throw errorDB
  }
}

const detail = async params => {
  const { query, select, populate } = transformParams(params)

  try {
    const goal = await Goal.findOne(query, select).populate(populate)

    if (goal === null) {
      const error = {
        status: 404,
        message: 'El goal no se encontro'
      }

      throw error
    }

    return goal
  } catch (errorDB) {
    throw errorDB
  }
}

const remove = async goalId => {
  const goal = await Goal.findOne({ _id: goalId })

  if (goal === null) {
    const error = {
      status: 404,
      message: 'El goal no se encontro'
    }

    throw error
  }

  try {
    await Goal.deleteOne({ _id: goalId })

    return goal
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
