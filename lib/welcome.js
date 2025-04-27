'use strict'

const Welcome = require('../models/welcome')

const { transformParams } = require('utils').transform

const count = async params => {
  const { query } = transformParams(params)
  const count = await Welcome.countDocuments(query)
  return count
}

const list = async params => {
  const { query, select, populate, sort, limit, skip } = transformParams(params)

  const welcomes = await Welcome.find(query, select)
    .populate(populate)
    .sort(sort)
    .limit(limit)
    .skip(skip)

  return welcomes
}

const create = async body => {
  try {
    const welcome = await Welcome.create(body)
    return welcome
  } catch (errorDB) {
    throw errorDB
  }
}

const update = async (welcomeId, body) => {
  const welcome = await Welcome.findOne({ _id: welcomeId })

  if (welcome === null) {
    const error = {
      status: 404,
      message: 'El welcome no se encontro'
    }

    throw error
  }

  try {
    const welcome = await Welcome.findOneAndUpdate(
      { _id: welcomeId },
      body,
      { new: true }
    )
    return welcome
  } catch (errorDB) {
    throw errorDB
  }
}

const detail = async params => {
  const { query, select, populate } = transformParams(params)

  try {
    const welcome = await Welcome.findOne(query, select).populate(populate)

    if (welcome === null) {
      const error = {
        status: 404,
        message: 'El welcome no se encontro'
      }

      throw error
    }

    return welcome
  } catch (errorDB) {
    throw errorDB
  }
}

const remove = async welcomeId => {
  const welcome = await Welcome.findOne({ _id: welcomeId })

  if (welcome === null) {
    const error = {
      status: 404,
      message: 'El welcome no se encontro'
    }

    throw error
  }

  try {
    await Welcome.deleteOne({ _id: welcomeId })

    return page
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
