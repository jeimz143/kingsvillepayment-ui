'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SchoolYearSchema = new Schema({
  code: {
    type: String,
    required: 'Code field is Required'
  },
  schoolStartDate: {
    type: Date,
    required: 'schoolStartDate field is required'
  },
  schoolEndDate: {
    type: Date,
    required: 'schoolEndDate field is required'
  },
  isOpen: {
    type: Boolean,
    default: true
  },
  deleted_at: {
    type: Date
  },
  updated_at: {
    type: Date,
    default: Date.now()
  },
  created_at: {
    type: Date,
    default: Date.now()
  }
})

SchoolYearSchema.statics.Store = function (SchoolYear, req, cb) {
  let vm = this
  var theSchoolYear = new SchoolYear(req)
  theSchoolYear.save(function (err, newSchoolYear) {
    if (err) return cb(err)
    if (!newSchoolYear) return cb(err)

    return cb(null, newSchoolYear)
  })
}

SchoolYearSchema.statics.Update = function (req, cb) {
  let vm = this
  var request = req.body
  request['updated_at'] = Date.now()
  vm.update({ _id: req.params.id }, { $set: request }).exec(function (err, schoolYears) {
    if (err) return cb(err)
    return cb(null, schoolYears)
  })
}

SchoolYearSchema.statics.softDelete = function (SchoolYear, req, cb) {
  let vm = this
  vm.update({ _id: { $in: req.ids } }, { $set: { deleted_at: Date.now() } }).exec(function (err, schoolYears) {
    if (err) return cb(err)
    return cb(null, schoolYears)
  })
}

module.exports = mongoose.model('SchoolYears', SchoolYearSchema)
