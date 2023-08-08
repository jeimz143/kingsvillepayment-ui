'use strict'

const models = require('../../models')

const schoolYears = []

const SchoolYear = models.SchoolYear

SchoolYear.deleteMany([])

schoolYears.push(new SchoolYear({
  code: '2020-2021',
  schoolStartDate: '2020-06-15T00:00:00.000+08:00',
  schoolEndDate: '2021-05-14T00:00:00.000+08:00'
}))

module.exports = schoolYears
