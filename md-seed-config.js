const mongoose = require('mongoose')

const Users = require('./src/database/seeders/users.seeder')
const Role = require('./src/database/seeders/role.seeder')
const Permission = require('./src/database/seeders/permissions.seeder')

const mongoURL = process.env.MONGO_DB_URL

/**
 * Seeders List
 * order is important
 * @type {Object}
 */
const seedersList = {
  Permission,
  Role,
  Users
}
/**
 * Connect to mongodb implementation
 * @return {Promise}
 */
const connect = async () =>
  mongoose.connect(mongoURL, { useNewUrlParser: true })
/**
 * Drop/Clear the database implementation
 * @return {Promise}
 */
const dropdb = async () => mongoose.connection.db.dropDatabase()

module.exports = {
  seedersList,
  connect,
  dropdb
}
