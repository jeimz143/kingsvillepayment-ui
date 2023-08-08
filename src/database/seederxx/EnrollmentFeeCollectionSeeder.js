'use strict'

const models = require('../../models')

const enrollmentFees = []

const EnrollmentFee = models.EnrollmentFee

EnrollmentFee.deleteMany([])

module.exports = enrollmentFees
