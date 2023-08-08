'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PaymentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Users'
  },
  fee: {
    type: Schema.Types.ObjectId,
    refs: 'Fees'
  },
  name: {
    type: String,
    required: 'Payment name is required'
  },
  description: {
    type: String
  },
  unitPrice: {
    type: Number,
    required: 'Unit Price is required'
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

PaymentSchema.statics.Store = function (Payment, req, cb) {
  var thePayment = new Payment(req)
  thePayment.save(function (err, newPayment) {
    if (err) return cb(err)
    if (!newPayment) return cb(err)

    return cb(null, newPayment)
  })
}

PaymentSchema.statics.Update = function (req, cb) {
  let vm = this
  var request = req.body
  request['updated_at'] = Date.now()
  vm.update({ _id: req.params.id }, { $set: request }).exec(function (err, payments) {
    if (err) return cb(err)
    return cb(null, payments)
  })
}

PaymentSchema.statics.softDelete = function (Payment, req, cb) {
  let vm = this
  vm.update({ _id: { $in: req.suppliersIds } }, { $set: { deleted_at: Date.now() } }).exec(function (err, suppliers) {
    if (err) return cb(err)
    return cb(null, suppliers)
  })
}

module.exports = mongoose.model('Payments', PaymentSchema)
