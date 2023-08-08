'use strict'

const mongoose = require('mongoose')
const mongooseeder = require('./mongooseeder')
const mongodbUrl = require('../../mongo.js')()

require('dotenv').config()

module.exports = {
  async run () {
    const Receipt = require('../../models').Receipt

    mongoose.set('useNewUrlParser', true)
    mongoose.set('useUnifiedTopology', true)
    mongoose.set('useCreateIndex', true)
    mongooseeder.seed({
      mongodbUrl: mongodbUrl,
      models: [Receipt],
      clean: true,
      mongoose: mongoose,
      seeds: () => {
        var promises = []
        var receipts = []

        receipts.forEach(function (model) {
          promises.push(model.save())
        })
        return Promise.all(promises)
      }
    })
  }
}
