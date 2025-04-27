'use strict'

const Ally = require('../models/ally')

const { transformParams } = require('utils').transform

const count = async params => {
  const { query } = transformParams(params)
  const count = await Ally.countDocuments(query)
  return count
}

const list = async params => {
  const { query, select, populate, sort, limit, skip } = transformParams(params)

  const allys = await Ally.find(query, select)
    .populate(populate)
    .sort(sort)
    .limit(limit)
    .skip(skip)

  return allys
}

const create = async body => {
  try {
    const ally = await Ally.create(body)
    return ally
  } catch (errorDB) {
    throw errorDB
  }
}

const update = async (allyId, body) => {
  const ally = await Ally.findOne({ _id: allyId })

  if (ally === null) {
    const error = {
      status: 404,
      message: 'El ally no se encontro'
    }

    throw error
  }

  try {
    const ally = await Ally.findOneAndUpdate(
      { _id: allyId },
      body,
      { new: true }
    )
    return ally
  } catch (errorDB) {
    throw errorDB
  }
}

const detail = async params => {
  const { query, select, populate } = transformParams(params)

  try {
    const ally = await Ally.findOne(query, select).populate(populate)

    if (ally === null) {
      const error = {
        status: 404,
        message: 'El ally no se encontro'
      }

      throw error
    }

    return ally
  } catch (errorDB) {
    throw errorDB
  }
}

const remove = async allyId => {
  const ally = await Ally.findOne({ _id: allyId })

  if (ally === null) {
    const error = {
      status: 404,
      message: 'El ally no se encontro'
    }

    throw error
  }

  try {
    await Ally.deleteOne({ _id: allyId })

    return ally
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
