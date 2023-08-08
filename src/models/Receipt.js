'use strict'
const padNumbers = require('../helpers/padNumbers')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReceiptSchema = new Schema({
  orNumber: {
    type: String,
    required: 'OR Number is Required'
  },
  paymentFee: {
    type: Schema.Types.ObjectId,
    ref: 'PaymentFees'
  },
  status: {
    type: Number,
    default: 0
  },
  remarks: {
    type: String
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

ReceiptSchema.statics.Store = function (Receipt, req, cb) {
  var receipts = []
  var request = req
  for (var ORNumber = request.start; ORNumber <= request.end; ORNumber++) {
    receipts.push({ orNumber: padNumbers(parseInt(ORNumber), 7), paymentFee: null, status: 0 })
  }
  Receipt.collection.insertMany(receipts, function (err, newReceipt) {
    if (err) return cb(err)
    if (!newReceipt) return cb(err)

    return cb(null, newReceipt)
  })
}

ReceiptSchema.statics.Update = function (req, cb) {
  let vm = this
  var request = req.body
  request['updated_at'] = Date.now()
  vm.update({ _id: req.params.id }, { $set: request }).exec(function (err, receipts) {
    if (err) return cb(err)
    return cb(null, receipts)
  })
}

ReceiptSchema.statics.softDelete = function (Receipt, req, cb) {
  let vm = this
  vm.update({ _id: { $in: req.receiptsIds } }, { $set: { deleted_at: Date.now() } }).exec(function (err, receipts) {
    if (err) return cb(err)
    return cb(null, receipts)
  })
}

module.exports = mongoose.model('Receipts', ReceiptSchema)
