'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FeeSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Users'
  },
  code: {
    type: String,
    required: 'Code is Required'
  },
  name: {
    type: String,
    required: 'Fee name is required'
  },
  description: {
    type: String
  },
  unitPrice: {
    type: Number,
    required: 'Unit Price is required'
  },
  paymentTerm: {
    type: Number,
    required: 'Payment Term is required',
    default: 1
  },
  forGraduating: {
    type: Boolean,
    default: false
  },
  isMandatory: {
    type: Boolean,
    default: false
  },
  isAnticipatedEventsAccessories: {
    type: Boolean,
    default: false
  },
  deleted_at: {
    type: Date,
    default: null
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

FeeSchema.statics.Store = function (Fee, req, cb) {
  var theFee = new Fee(req)
  theFee.save(function (err, newFee) {
    if (err) return cb(err)
    if (!newFee) return cb(err)

    return cb(null, newFee)
  })
}

FeeSchema.statics.Update = function (req, cb) {
  let vm = this
  var request = req.body
  request['updated_at'] = Date.now()
  vm.update({ _id: req.params.id }, { $set: request }).exec(function (err, suppliers) {
    if (err) return cb(err)
    return cb(null, suppliers)
  })
}

FeeSchema.statics.softDelete = function (Level, req, cb) {
  let vm = this
  vm.update({ _id: { $in: req.suppliersIds } }, { $set: { deleted_at: Date.now() } }).exec(function (err, suppliers) {
    if (err) return cb(err)
    return cb(null, suppliers)
  })
}

module.exports = mongoose.model('Fees', FeeSchema)
