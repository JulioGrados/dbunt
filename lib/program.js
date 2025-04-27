'use strict'

const Program = require('../models/program')

const { transformParams } = require('utils').transform

const count = async params => {
  const { query } = transformParams(params)
  const count = await Program.countDocuments(query)
  return count
}

const list = async params => {
  const { query, select, populate, sort, limit, skip } = transformParams(params)

  const programs = await Program.find(query, select)
    .populate(populate)
    .sort(sort)
    .limit(limit)
    .skip(skip)

  return programs
}

const create = async body => {
  try {
    const program = await Program.create(body)
    return program
  } catch (errorDB) {
    throw errorDB
  }
}

const update = async (programId, body) => {
  const program = await Program.findOne({ _id: programId })

  if (program === null) {
    const error = {
      status: 404,
      message: 'El program no se encontro'
    }

    throw error
  }

  try {
    const program = await Program.findOneAndUpdate(
      { _id: programId },
      body,
      { new: true }
    )
    return program
  } catch (errorDB) {
    throw errorDB
  }
}

const detail = async params => {
  const { query, select, populate } = transformParams(params)

  try {
    const program = await Program.findOne(query, select).populate(populate)

    if (program === null) {
      const error = {
        status: 404,
        message: 'El program no se encontro'
      }

      throw error
    }

    return program
  } catch (errorDB) {
    throw errorDB
  }
}

const remove = async programId => {
  const program = await Program.findOne({ _id: programId })

  if (program === null) {
    const error = {
      status: 404,
      message: 'El program no se encontro'
    }

    throw error
  }

  try {
    await Program.deleteOne({ _id: programId })

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
