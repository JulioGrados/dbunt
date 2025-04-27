'use strict'

const Portfolio = require('../models/portfolio')

const { transformParams } = require('utils').transform

const count = async params => {
  const { query } = transformParams(params)
  const count = await Portfolio.countDocuments(query)
  return count
}

const list = async params => {
  const { query, select, populate, sort, limit, skip } = transformParams(params)

  const portfolios = await Portfolio.find(query, select)
    .populate(populate)
    .sort(sort)
    .limit(limit)
    .skip(skip)

  return portfolios
}

const create = async body => {
  try {
    const portfolio = await Portfolio.create(body)
    return portfolio
  } catch (errorDB) {
    throw errorDB
  }
}

const update = async (portfolioId, body) => {
  const portfolio = await Portfolio.findOne({ _id: portfolioId })

  if (portfolio === null) {
    const error = {
      status: 404,
      message: 'El portfolio no se encontro'
    }

    throw error
  }

  try {
    const portfolio = await Portfolio.findOneAndUpdate(
      { _id: portfolioId },
      body,
      { new: true }
    )
    return portfolio
  } catch (errorDB) {
    throw errorDB
  }
}

const detail = async params => {
  const { query, select, populate } = transformParams(params)

  try {
    const portfolio = await Portfolio.findOne(query, select).populate(populate)

    if (portfolio === null) {
      const error = {
        status: 404,
        message: 'El portfolio no se encontro'
      }

      throw error
    }

    return portfolio
  } catch (errorDB) {
    throw errorDB
  }
}

const remove = async portfolioId => {
  const portfolio = await Portfolio.findOne({ _id: portfolioId })

  if (portfolio === null) {
    const error = {
      status: 404,
      message: 'El portfolio no se encontro'
    }

    throw error
  }

  try {
    await Portfolio.deleteOne({ _id: portfolioId })

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
