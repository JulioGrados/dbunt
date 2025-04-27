'use strict'

const Initiative = require('../models/initiative')

const { transformParams } = require('utils').transform

const count = async params => {
  const { query } = transformParams(params)
  const count = await Initiative.countDocuments(query)
  return count
}

const list = async params => {
  const { query, select, populate, sort, limit, skip } = transformParams(params)

  const initiatives = await Initiative.find(query, select)
    .populate(populate)
    .sort(sort)
    .limit(limit)
    .skip(skip)

  return initiatives
}

const create = async body => {
  try {
    const initiative = await Initiative.create(body)
    return initiative
  } catch (errorDB) {
    throw errorDB
  }
}

const update = async (initiativeId, body) => {
  const initiative = await Initiative.findOne({ _id: initiativeId })

  if (initiative === null) {
    const error = {
      status: 404,
      message: 'El initiative no se encontro'
    }

    throw error
  }

  try {
    const initiative = await Initiative.findOneAndUpdate(
      { _id: initiativeId },
      body,
      { new: true }
    )
    return initiative
  } catch (errorDB) {
    throw errorDB
  }
}

const detail = async params => {
  const { query, select, populate } = transformParams(params)

  try {
    const initiative = await Initiative.findOne(query, select).populate(populate)

    if (initiative === null) {
      const error = {
        status: 404,
        message: 'El initiative no se encontro'
      }

      throw error
    }

    return initiative
  } catch (errorDB) {
    throw errorDB
  }
}

const remove = async initiativeId => {
  const initiative = await Initiative.findOne({ _id: initiativeId })

  if (initiative === null) {
    const error = {
      status: 404,
      message: 'El initiative no se encontro'
    }

    throw error
  }

  try {
    await Initiative.deleteOne({ _id: initiativeId })

    return initiative
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
