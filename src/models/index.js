var mongoose = require('mongoose')
var bluebird = require('bluebird')

mongoose.Promise = bluebird

var models = {}

models['Role'] = require('./Role')
models['Permission'] = require('./Permission')
models['User'] = require('./User')
models['Student'] = require('./Student')
models['Level'] = require('./Level')
models['Fee'] = require('./Fee')
models['SchoolYear'] = require('./SchoolYear')
models['Enrollment'] = require('./Enrollment')
models['EnrollmentFee'] = require('./EnrollmentFees')
models['Payment'] = require('./Payment')
models['PaymentFees'] = require('./PaymentFees')
models['Receipt'] = require('./Receipt')
module.exports = models
