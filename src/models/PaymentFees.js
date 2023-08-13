'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const AutoIncrement = require('mongoose-sequence')(mongoose)

const PaymentFeeSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Users'
  },
  branch: {
    type: String,
    default: null
  },
  enrollmentFee: {
    type: Schema.Types.ObjectId,
    ref: 'EnrollmentFees'
  },
  formOfPayment: {
    type: Number,
    default: 1
  },
  cashTendered: {
    type: Number
  },
  cashChange: {
    type: Number
  },
  amountDue: {
    type: Number,
    default: 0
  },
  amountToPayPerMonth: {
    type: Number,
    default: 0
  },
  remarks: {
    type: String
  },
  dueDate: {
    type: Date
  },
  numberOfDaysDue: {
    type: Number,
    default: 0
  },
  dateToPay: {
    type: Date
  },
  datePaid: {
    type: Date,
    default: Date.now()
  },
  isPaid: {
    type: Boolean,
    default: false
  },
  receipt: {
    type: Schema.Types.ObjectId,
    ref: 'Receipts'
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
PaymentFeeSchema.plugin(AutoIncrement, { inc_field: 'payment_fee_no' })
PaymentFeeSchema.statics.Store = function (PaymentFee, request, cb) {
  var ThePaymentFee = new PaymentFee(request)
  ThePaymentFee.save(function (err, newPaymentFee) {
    if (err) return cb(err)
    if (!newPaymentFee) return cb(err)

    return cb(null, newPaymentFee)
  })
}

PaymentFeeSchema.statics.Update = function (req, cb) {
  let vm = this
  var ThePaymentFee = req
  var theID = (req.params) ? req.params.id : ThePaymentFee._id
  vm.update({ _id: theID }, { $set: ThePaymentFee }).exec(function (err, response) {
    if (err) return cb(err)
    return cb(null, response)
  })
}

PaymentFeeSchema.statics.Delete = function (req, cb) {
  let vm = this
  vm.update({ _id: { $in: req.id } }, { $set: { deleted_at: Date.now() } }).exec(function (err, response) {
    if (err) return cb(err)
    return cb(null, response)
  })
}

PaymentFeeSchema.statics.Destroy = function (req, cb) {
  let vm = this
  vm.destroy({ _id: { $in: req.id } }, { $set: { deleted_at: Date.now() } }).exec(function (err, response) {
    if (err) return cb(err)
    return cb(null, response)
  })
}

module.exports = mongoose.model('PaymentFees', PaymentFeeSchema)
