'use strict'

const mongoose = require('mongoose')
const mongooseeder = require('./mongooseeder')
const mongodbUrl = require('../../mongo.js')()

require('dotenv').config()

module.exports = {
  async run () {
    const SchoolYear = require('../../models').SchoolYear

    mongoose.set('useNewUrlParser', true)
    mongoose.set('useUnifiedTopology', true)
    mongoose.set('useCreateIndex', true)
    mongooseeder.seed({
      mongodbUrl: mongodbUrl,
      models: [SchoolYear],
      clean: true,
      mongoose: mongoose,
      seeds: () => {
        var promises = []
        var schoolyears = []

        schoolyears.push(new SchoolYear({
          code: '2020-2021',
          schoolStartDate: '2020-08-20T00:00:00.000+08:00',
          schoolEndDate: '2021-05-20T00:00:00.000+08:00'
        }))

        schoolyears.forEach(function (model) {
          promises.push(model.save())
        })
        return Promise.all(promises)
      }
    })
  }
}
