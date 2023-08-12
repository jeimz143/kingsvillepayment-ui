const mongoose = require('mongoose')

const Branches = require('./src/database/seeders/branches.seeder')
const Users = require('./src/database/seeders/users.seeder')
const Role = require('./src/database/seeders/role.seeder')
const Permissions = require('./src/database/seeders/permissions.seeder')
const Level = require('./src/database/seeders/levels.seeder')
const Fee = require('./src/database/seeders/fees.seeder')
const Student = require('./src/database/seeders/students.seeder')
const SchoolYear = require('./src/database/seeders/schoolyears.seeder')
const Enrollment = require('./src/database/seeders/enrollments.seeder')

const mongoURL = process.env.MONGO_DB_URL
console.log(mongoURL)

/**
 * Seeders List
 * order is important
 * @type {Object}
 */
const seedersList = {
  Branches,
  Level,
  Fee,
  Student,
  SchoolYear,
  Enrollment,
  Permissions,
  Role,
  Users
}
/**
 * Connect to mongodb implementation
 * @return {Promise}
 */

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  autoIndex: false, // Don't build indexes
  // reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  // reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4 // Use IPv4, skip trying IPv6
}

const connect = async () =>
  mongoose.connect(mongoURL, options)
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
