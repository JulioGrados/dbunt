'use strict'

const Page = require('../models/page')

const { transformParams } = require('utils').transform

const count = async params => {
  const { query } = transformParams(params)
  const count = await Page.countDocuments(query)
  return count
}

const list = async params => {
  const { query, select, populate, sort, limit, skip } = transformParams(params)

  const pages = await Page.find(query, select)
    .populate(populate)
    .sort(sort)
    .limit(limit)
    .skip(skip)

  return pages
}

const create = async body => {
  try {
    const existingPage = await Page.findOne({
      $or: [{ page: body.page }]
    });
  
    if (existingPage) {
      const error = {
        status: 404,
        message: 'La página que intentas crear ya existe.'
      }
      throw error
    }
    const page = await Page.create(body)
    return page
  } catch (errorDB) {
    throw errorDB
  }
}

const update = async (pageId, body) => {
  const page = await Page.findOne({ _id: pageId })

  if (page === null) {
    const error = {
      status: 404,
      message: 'El page no se encontro'
    }

    throw error
  }

  try {
    const page = await Page.findOneAndUpdate(
      { _id: pageId },
      body,
      { new: true }
    )
    return page
  } catch (errorDB) {
    throw errorDB
  }
}

const detail = async params => {
  const { query, select, populate } = transformParams(params)

  try {
    const page = await Page.findOne(query, select).populate(populate)

    if (page === null) {
      const error = {
        status: 404,
        message: 'El page no se encontro'
      }

      throw error
    }

    return page
  } catch (errorDB) {
    throw errorDB
  }
}

const remove = async pageId => {
  const page = await Page.findOne({ _id: pageId })

  if (page === null) {
    const error = {
      status: 404,
      message: 'El page no se encontro'
    }

    throw error
  }

  try {
    await Page.deleteOne({ _id: pageId })

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
