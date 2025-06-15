'use strict'

const Evaluation = require('../models/evaluation')

const { transformParams } = require('utils').transform

const count = async params => {
  const { query } = transformParams(params)
  const count = await Evaluation.countDocuments(query)
  return count
}

const list = async params => {
  const { query, select, populate, sort, limit, skip } = transformParams(params)

  const evaluations = await Evaluation.find(query, select)
    .populate(populate)
    .sort(sort)
    .limit(limit)
    .skip(skip)

  return evaluations
}

const create = async body => {
  try {
    const evaluation = await Evaluation.create(body)
    return evaluation
  } catch (errorDB) {
    throw errorDB
  }
}

const update = async (evaluationId, body) => {
  const evaluation = await Evaluation.findOne({ _id: evaluationId })

  if (evaluation === null) {
    const error = {
      status: 404,
      message: 'El evaluation no se encontro'
    }

    throw error
  }

  try {
    const evaluation = await Evaluation.findOneAndUpdate(
      { _id: evaluationId },
      body,
      { new: true }
    )
    return evaluation
  } catch (errorDB) {
    throw errorDB
  }
}

const detail = async params => {
  const { query, select, populate } = transformParams(params)

  try {
    const evaluation = await Evaluation.findOne(query, select).populate(populate)

    if (evaluation === null) {
      const error = {
        status: 404,
        message: 'El evaluation no se encontro'
      }

      throw error
    }

    return evaluation
  } catch (errorDB) {
    throw errorDB
  }
}

const remove = async evaluationId => {
  const evaluation = await Evaluation.findOne({ _id: evaluationId })

  if (evaluation === null) {
    const error = {
      status: 404,
      message: 'El evaluation no se encontro'
    }

    throw error
  }

  try {
    await Evaluation.deleteOne({ _id: evaluationId })

    return evaluation
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
