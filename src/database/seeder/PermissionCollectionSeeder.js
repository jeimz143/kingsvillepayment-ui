'use strict'

const mongoose = require('mongoose')
const mongooseeder = require('./mongooseeder')
const mongodbUrl = require('../../mongo.js')()

require('dotenv').config()

module.exports = {
  async run () {
    const Permission = require('../../models').Permission

    mongoose.set('useNewUrlParser', true)
    mongoose.set('useUnifiedTopology', true)
    mongoose.set('useCreateIndex', true)
    mongooseeder.seed({
      mongodbUrl: mongodbUrl,
      models: [Permission],
      clean: true,
      mongoose: mongoose,
      seeds: () => {
        var promises = []
        var permissions = []

        permissions.push(new Permission({ name: 'schoolyear.index' }))
        permissions.push(new Permission({ name: 'schoolyear.create' }))
        permissions.push(new Permission({ name: 'schoolyear.edit' }))
        permissions.push(new Permission({ name: 'student.index' }))
        permissions.push(new Permission({ name: 'student.create' }))
        permissions.push(new Permission({ name: 'student.edit' }))
        permissions.push(new Permission({ name: 'enrollment.index' }))
        permissions.push(new Permission({ name: 'enrollment.create' }))
        permissions.push(new Permission({ name: 'enrollment.edit' }))
        permissions.push(new Permission({ name: 'enrollment.statementofaccount' }))
        permissions.push(new Permission({ name: 'fee.index' }))
        permissions.push(new Permission({ name: 'fee.create' }))
        permissions.push(new Permission({ name: 'fee.edit' }))
        permissions.push(new Permission({ name: 'level.index' }))
        permissions.push(new Permission({ name: 'level.create' }))
        permissions.push(new Permission({ name: 'level.edit' }))
        permissions.push(new Permission({ name: 'reports.payment' }))
        permissions.push(new Permission({ name: 'reports.enrollment' }))
        permissions.push(new Permission({ name: 'payment.index' }))
        permissions.push(new Permission({ name: 'payment.create' }))
        permissions.push(new Permission({ name: 'payment.edit' }))
        permissions.push(new Permission({ name: 'receipt.index' }))
        permissions.push(new Permission({ name: 'receipt.create' }))
        permissions.push(new Permission({ name: 'receipt.edit' }))

        permissions.forEach(function (model) {
          promises.push(model.save())
        })
        return Promise.all(promises)
      }
    })
  }
}
