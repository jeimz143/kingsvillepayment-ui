const mongoose = require('mongoose')
const mongooseeder = require('mongooseeder')
const models = require('../../models')

require('dotenv').config()

// var env = process.env.NODE_ENV || 'DEVELOPMENT'

// console.log(env)

const mongodbUrl = require('../../mongo.js')()
const seeds = () => {
  const roles = require('./RoleCollectionSeeder')
  const permissions = require('./PermissionCollectionSeeder')
  const users = require('./UserCollectionSeeder')
  const levels = require('./LevelCollectionSeeder')
  const fees = require('./FeeCollectionSeeder')
  const students = require('./StudentCollectionSeeder')
  const schoolyears = require('./SchoolYearCollectionSeeder')
  const enrollments = require('./EnrollmentCollectionSeeder')
  const enrollmentfees = require('./EnrollmentFeeCollectionSeeder')
  const payments = require('./PaymentCollectionSeeder')
  const receipts = require('./ReceiptCollectionSeeder')

  var promises = []
  var allCollection = [
    roles,
    permissions,
    users,
    levels,
    fees,
    students,
    schoolyears,
    enrollments,
    enrollmentfees,
    payments,
    receipts
  ]
  allCollection.forEach(function (collection, collIndex) {
    collection.forEach(function (model) {
      promises.push(model.save())
    })
  })
  console.log(Promise.all(promises))
  return Promise.all(promises)
}
mongoose.set('useNewUrlParser', true)
mongooseeder.seed({
  mongodbUrl: mongodbUrl,
  models: models,
  clean: true,
  mongoose: mongoose,
  seeds: seeds
})
