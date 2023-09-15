'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LevelSchema = new Schema({
  code: {
    type: String,
    required: 'Code is Required'
  },
  name: {
    type: String,
    required: 'Level name is required'
  },
  description: {
    type: String
  },
  unitPrice: {
    type: Number,
    required: 'Unit Price is required'
  },
  scholarUnitPrice: {
    type: Number,
    default: 0
  },
  miscellUnitPrice: {
    type: Number,
    required: 'Miscellaneous Fee is required'
  },
  miscellScholarUnitPrice: {
    type: Number,
    default: 0
  },
  registrationFee: {
    type: Number,
    required: 'Registration Fee is required'
  },
  booksUnitPrice: {
    type: Number,
    required: 'Books Fee is required'
  },
  booksScholarUnitPrice: {
    type: Number,
    default: 0
  },
  branch: {
    type: String,
    default: null
  },
  isGraduating: {
    type: Boolean,
    default: false
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

LevelSchema.statics.Store = function (Level, req, cb) {
  let vm = this
  var theLevel = new Level(req)
  theLevel.save(function (err, newLevel) {
    if (err) return cb(err)
    if (!newLevel) return cb(err)

    return cb(null, newLevel)
  })
}

LevelSchema.statics.Update = function (req, cb) {
  let vm = this
  var request = req.body
  request['updated_at'] = Date.now()
  vm.update({ _id: req.params.id }, { $set: request }).exec(function (err, levels) {
    if (err) return cb(err)
    return cb(null, levels)
  })
}

LevelSchema.statics.softDelete = function (Level, req, cb) {
  let vm = this
  vm.update({ _id: { $in: req.suppliersIds } }, { $set: { deleted_at: Date.now() } }).exec(function (err, suppliers) {
    if (err) return cb(err)
    return cb(null, suppliers)
  })
}

module.exports = mongoose.model('Levels', LevelSchema)
