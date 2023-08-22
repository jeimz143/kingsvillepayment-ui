'use strict'

const mongoose = require('mongoose')
const moment = require('moment')
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
PaymentFeeSchema.plugin(AutoIncrement, { inc_field: 'referenceNumber', start_seq: 1000 })
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

PaymentFeeSchema.statics.StorePaymentFee = async function (enrollment, EnrollmentFee, PaymentFee, SchoolYear, req, user) {
  // let vm = this
  let r = req
  await enrollment.fees.forEach(async (feeId, feeIndex) => {
    const feeItem = await EnrollmentFee.findById(feeId).exec()
    var paymentfees = []
    var pf = {
      userId: user._id,
      branch: r.branch,
      enrollmentFee: feeItem._id,
      formOfPayment: null,
      cashTendered: 0,
      dateToPay: null,
      dueDate: null,
      numberOfDaysDue: 0,
      isPaid: false,
      receipt: null,
      remarks: ''
    }

    if (enrollment.isScholar && (feeItem.name === 'Books' || feeItem.name === 'Tuition Fees')) {
      pf.isPaid = true
    }

    if (feeItem.paymentTerm === 1) {
      pf['amountToPayPerMonth'] = feeItem.amount
      pf['amountDue'] = feeItem.amount

      paymentfees.push(new PaymentFee(pf))
    } else {
      var currentDate = moment(moment().format(), 'YYYY-MM-DD')

      var schoolYear = await SchoolYear.findOne({ code: enrollment.schoolYearCode }).exec()
      var schoolStart = moment(schoolYear.schoolStartDate)
      var schoolEnd = moment(schoolYear.schoolEndDate)
      var numberofSchoolMonth = Math.round(schoolEnd.diff(schoolStart, 'months', true)) + 1
      var intervalMonthToPay = 0
      var intervalDaysDueDate = 5
      var amountDaysDueValue = 85

      var dateToPay = moment(schoolStart.format('YYYY-MM-DD'), 'YYYY-MM-DD')

      for (var i = 0; i < numberofSchoolMonth; i++) {
        pf['dateToPay'] = moment(dateToPay.format('YYYY-MM-DD'), 'YYYY-MM-DD').add(intervalMonthToPay, 'month')
        pf['dueDate'] = moment(pf['dateToPay'].format('YYYY-MM-DD'), 'YYYY-MM-DD').add(intervalDaysDueDate, 'days')
        pf['amountToPayPerMonth'] = (feeItem.amount / numberofSchoolMonth)
        var numberOfDaysDue = parseInt(currentDate.diff(pf['dueDate'], 'days', true))
        if (numberOfDaysDue === 0) {
          pf['amountDue'] = pf['amountToPayPerMonth'] + (numberOfDaysDue * amountDaysDueValue)
        } else {
          pf['amountDue'] = pf['amountToPayPerMonth']
        }
        intervalMonthToPay++
        paymentfees.push(new PaymentFee(pf))
      }
    }
    const paymentIds = paymentfees.map((item) => item._id)
    var feeAlreadyPaid = false
    if (enrollment.isScholar && (feeItem.name === 'Books' || feeItem.name === 'Tuition Fees')) {
      feeAlreadyPaid = true
    }
    try {
      await EnrollmentFee.updateOne({ _id: feeItem._id }, { $set: { payments: paymentIds, isPaid: feeAlreadyPaid } }).exec(async function (_err, ef) {
        PaymentFee.create(paymentfees)
      })
    } catch (err) {
      console.log('ERROR:', err)
    }
  })
}

module.exports = mongoose.model('PaymentFees', PaymentFeeSchema)
