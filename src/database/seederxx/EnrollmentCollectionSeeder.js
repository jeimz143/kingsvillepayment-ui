'use strict'

const models = require('../../models')

const enrollments = []

const Enrollment = models.Enrollment

Enrollment.deleteMany([])

module.exports = enrollments
