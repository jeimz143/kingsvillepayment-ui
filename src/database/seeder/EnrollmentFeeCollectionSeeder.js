'use strict'

const mongoose = require('mongoose')
const mongooseeder = require('./mongooseeder')
const mongodbUrl = require('../../mongo.js')()

require('dotenv').config()

module.exports = {
  async run () {
    const EnrollmentFee = require('../../models').EnrollmentFee
    const Enrollment = require('../../models').Enrollment
    const Level = require('../../models').Level
    const Fee = require('../../models').Fee
    var enrolledStd = await Enrollment.find().exec()
    var enrollementFees = []
    enrolledStd.forEach(async (enrolledItem, enrolledIndex) => {
      var mandatoryFees = await Fee.find().exec()
      // var books = new EnrollmentFee({
      //   type: 0,
        
      // })
      // enrollementFees.push()
    })
    mongoose.set('useNewUrlParser', true)
    mongoose.set('useUnifiedTopology', true)
    mongoose.set('useCreateIndex', true)
    mongooseeder.seed({
      mongodbUrl: mongodbUrl,
      models: [EnrollmentFee],
      clean: true,
      mongoose: mongoose,
      seeds: () => {
        var promises = []
        var enrollments = []
        enrollments.forEach(function (model) {
          promises.push(model.save())
        })
        return Promise.all(promises)
      }
    })
  }
}
