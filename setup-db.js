'use strict'

const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const defaults = require('defaults')

let db = null

module.exports = config => {
  config = defaults(config, {
    host: 'localhost',
    database: 'incubaunt',
    env: 'dev'
  })

  const { username, password, host, env, database } = config

  let uri = `mongodb://${host}/${database}`
  const opt = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
  }

  if (env === 'test') {
    // uri = `mongodb://${host}/bizeustest`
    uri = `mongodb://localhost:27017/incubaunt`
  } else if (env === 'prod') {
    uri = `mongodb+srv://${username}:${password}@${host}/${database}`
  }

  let mongoServer

  const connect = async () => {
    console.log('connect')
    if (db) {
      return db
    }
    console.log('db initial', db)
    try {
      if (env === 'test') {
        mongoServer = new MongoMemoryServer()
        const mongoUri = await mongoServer.getUri()
        db = await mongoose.connect(mongoUri, opt)
        return db
      }
      db = await mongoose.connect(uri, opt)
    } catch (error) {
      const errorMenssage = {
        status: 500,
        menssage: 'Error de conexión con la base de datos',
        error
      }
      throw errorMenssage
    }

    mongoose.Promise = global.Promise
    return db
  }

  const close = async () => {
    if (env === 'test') {
      await mongoServer.stop()
    }
    if (db) {
      await db.disconnect()
      db = null
    }
  }

  return {
    connect,
    close
  }
}
