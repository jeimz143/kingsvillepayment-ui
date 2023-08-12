'use strict'
var MailConfig = require('../config/email')
var hbs = require('nodemailer-express-handlebars')
var smtpTransport = MailConfig.GmailTransport

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const AutoIncrement = require('mongoose-sequence')(mongoose)
const EnrollmentFeeSchema = new Schema({
  number: {
    type: Number
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Users'
  },
  code: {
    type: String,
    required: 'Code is Required'
  },
  enrollment: {
    type: Schema.Types.ObjectId,
    ref: 'Enrollments'
  },
  payments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'PaymentFees'
    }
  ],
  branch: {
    type: String,
    default: null
  },
  type: {
    type: Number
  },
  name: {
    type: String,
    required: 'Fee name is required'
  },
  description: {
    type: String
  },
  quantity: {
    type: Number,
    default: null
  },
  unitPrice: {
    type: Number,
    required: 'Unit Price is required'
  },
  discount: {
    type: Number,
    default: 0
  },
  amount: {
    type: Number,
    required: 'Amount is required'
  },
  paymentTerm: {
    type: Number,
    required: 'Payment Term is required',
    default: 1
  },
  remarks: {
    type: String
  },
  isPaid: {
    type: Boolean,
    default: false
  },
  balance: {
    type: Number,
    default: 0
  },
  isMandatory: {
    type: Boolean,
    default: false
  },
  forGraduating: {
    type: Boolean,
    default: false
  },
  isAnticipatedEventsAccessories: {
    type: Boolean,
    default: false
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

EnrollmentFeeSchema.plugin(AutoIncrement, { inc_field: 'number' })

EnrollmentFeeSchema.methods.SendEmail = (data) => {
  MailConfig.ViewOption(smtpTransport, hbs, 'payments')
  let HelperOptions = {
    from: '"Kingsville Advanced School System[NO-REPLY]" <kingsville.edu.ph@gmail.com>',
    to: data.student.email,
    subject: 'Summary Payment',
    template: 'payments',
    context: {
      name: 'System Mailer',
      email: 'kingsville.edu.ph@gmail.com',
      address: '7 Quezon Street, Tayug 2445, Pangasinan, Philippines',
      contact: '(075) 636.1584',
      website: 'http://kingsville.edu.ph',
      student: JSON.parse(JSON.stringify(data.student)),
      enrollmentFee: JSON.parse(JSON.stringify(data.enrollmentFee)),
      isPaid: (data.enrollmentFee.isPaid) ? 'Paid' : 'Not Paid'
    }
  }

  smtpTransport.verify((error, success) => {
    if (error) {
      console.log('ERROR SENDING EMAIL', error)
    } else {
      smtpTransport.sendMail(HelperOptions, (error, info) => {
        if (error) {
          console.log('ERROR SENDING EMAIL', error)
        }
        console.log('SUCCESS SENDING EMAIL', info)
      })
    }
  })
}

EnrollmentFeeSchema.statics.Store = function (EnrollmentFee, request, cb) {
  var TheEnrollmentFee = new EnrollmentFee(request)

  TheEnrollmentFee.save(function (err, newEnrollmentFee) {
    if (err) return cb(err)
    if (!newEnrollmentFee) return cb(err)

    return cb(null, newEnrollmentFee)
  })
}

EnrollmentFeeSchema.statics.Update = async function (EnrollmentFee, PaymentFee, req, cb) {
  let vm = this
  var TheEnrollmentFee = req.body
  var theID = (req.params) ? req.params.id : TheEnrollmentFee._id
  var paymentIds = []
  // var today = new Date()
  // var dd = String(today.getDate()).padStart(2, '0')
  // var mm = String(today.getMonth() + 1).padStart(2, '0')
  // var yyyy = today.getFullYear()
  if (TheEnrollmentFee.paymentTerm === 2) {
    var sumOfAmountPaid = TheEnrollmentFee.payments.reduce(function (cnt, payment) {
      return cnt + payment.amountPaid
    }, 0)
    if (sumOfAmountPaid < TheEnrollmentFee.amount) {
      return cb('Payment must be fully paid')
    }
  }
  TheEnrollmentFee.payments.forEach((paymentItems, paymentIndex) => {
    // console.log(totalPaymentFees)
    var totalPaymentFees = null
    PaymentFee.countDocuments().then((res) => {
      totalPaymentFees = res
    })
    var ThePaymentFee = null
    paymentItems['userId'] = req.user._id
    if (paymentItems.isNew) {
      delete paymentItems._id
      paymentItems['enrollmentFee'] = TheEnrollmentFee._id
      paymentItems['number'] = totalPaymentFees + 1
      if (paymentItems['cashTendered'] !== 0) {
        paymentItems['isPaid'] = true
      }
      ThePaymentFee = new PaymentFee(paymentItems)
      ThePaymentFee.save()
    } else {
      ThePaymentFee = paymentItems
      if (paymentItems['cashTendered'] !== 0) {
        paymentItems['isPaid'] = true
      }
      PaymentFee.update({ _id: ThePaymentFee._id }, { $set: ThePaymentFee }).exec()
    }
    paymentIds.push(mongoose.Types.ObjectId(ThePaymentFee._id))
  })
  var notPaidPaymentItems = TheEnrollmentFee.payments.filter((payment) => {
    return payment.isPaid !== true
  })
  var setData = {
    isPaid: (notPaidPaymentItems.length === 0),
    balance: TheEnrollmentFee.balance,
    payments: paymentIds,
    updated_at: Date.now()
  }
  vm.update({ _id: theID }, { $set: setData }).exec(function (err, response) {
    if (err) return cb(err)
    return cb(null, response)
  })
}

EnrollmentFeeSchema.statics.Delete = function (req, cb) {
  let vm = this
  vm.update({ _id: { $in: req.id } }, { $set: { deleted_at: Date.now() } }).exec(function (err, response) {
    if (err) return cb(err)
    return cb(null, response)
  })
}

EnrollmentFeeSchema.statics.Destroy = function (req, cb) {
  let vm = this
  vm.destroy({ _id: { $in: req.id } }, { $set: { deleted_at: Date.now() } }).exec(function (err, response) {
    if (err) return cb(err)
    return cb(null, response)
  })
}

module.exports = mongoose.model('EnrollmentFees', EnrollmentFeeSchema)
