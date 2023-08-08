'use strict'

const PaymentFee = require('../../../models/PaymentFees')

const calculateTotal = (arr = []) => {
  var total = 0
  if (arr.length !== 0) {
    arr.forEach((arrItem, arrIndex) => {
      var theAmountDue = (arrItem.amountDue) ? arrItem.amountDue : 0
      total += parseFloat(theAmountDue)
    })
  }
  return parseFloat(total)
}

const calculatePercentage = (frequency, totalFrequency) => {
  if (frequency === 0) return 0
  return (frequency / totalFrequency) * 100
}

module.exports = {
  async Daily (req, res) {
    var socketio = req.app.get('socketio')
    // var moment = require('moment')
    // const theDate = new Date(parseInt(fromDate.format('YYYY')), parseInt(fromDate.format('MM')), parseInt(fromDate.format('DD')))
    const fromDate = new Date(req.body.fromDate)
    const toDate = new Date(req.body.toDate)
    var paymentFees = await PaymentFee.find({
      'datePaid': {
        '$gte': fromDate,
        '$lte': toDate
      },
      'cashTendered': {
        '$ne': 0
      }
    }).populate([
      {
        path: 'enrollmentFee',
        model: 'EnrollmentFees',
        populate: [
          {
            path: 'enrollment',
            model: 'Enrollments',
            select: ['-fees']
          }
        ]
      }
    ]).exec()

    var registrationFee = paymentFees.filter((rf) =>
      rf.enrollmentFee.name === 'Registration Fees' &&
      rf.isPaid)
    var books = paymentFees.filter((rf) =>
      rf.enrollmentFee.name === 'Books' &&
      rf.isPaid)
    var tuitionFee = paymentFees.filter((rf) =>
      rf.enrollmentFee.name === 'Tuition Fees' &&
      rf.isPaid)
    var miscellanousFee = paymentFees.filter((rf) =>
      rf.enrollmentFee.name === 'Miscellaneous Fees' &&
      rf.isPaid)
    var otherFees = paymentFees.filter((rf) =>
      (rf.enrollmentFee.name !== 'Miscellaneous Fees' && rf.enrollmentFee.name !== 'Tuition Fees' && rf.enrollmentFee.name !== 'Books' && rf.enrollmentFee.name !== 'Registration Fees') &&
      rf.isPaid)
    var registrationFeeTotal = calculateTotal(registrationFee)
    var tuitionFeeTotal = calculateTotal(tuitionFee)
    var booksTotal = calculateTotal(books)
    var miscellanousFeeTotal = calculateTotal(miscellanousFee)
    var otherFeesTotal = calculateTotal(otherFees)

    var overAllTotal = registrationFeeTotal + tuitionFeeTotal + booksTotal + miscellanousFeeTotal + otherFeesTotal

    var registrationFeePercentage = calculatePercentage(registrationFeeTotal, overAllTotal)
    var tuitionFeePercentage = calculatePercentage(tuitionFeeTotal, overAllTotal)
    var booksPercentage = calculatePercentage(booksTotal, overAllTotal)
    var miscellanousFeePercentage = calculatePercentage(miscellanousFeeTotal, overAllTotal)
    var otherFeesPercentage = calculatePercentage(otherFeesTotal, overAllTotal)
    var nonePercentage = 0
    if (overAllTotal === 0) {
      nonePercentage = 100
    }
    res.send({
      details: 'Daily Payment Listed!'
    })
    socketio.emit('DailyPayments', { overAllTotal: overAllTotal,
      series: [booksPercentage, registrationFeePercentage, tuitionFeePercentage, miscellanousFeePercentage, otherFeesPercentage, nonePercentage],
      labels: ['Books', 'Registration Fees', 'Tuition Fees', 'Miscellanous Fees', 'Others', 'No Payments'] })
  },
  async Monthly (req, res) {
    var socketio = req.app.get('socketio')
    // var moment = require('moment')
    // const theDate = new Date(parseInt(fromDate.format('YYYY')), parseInt(fromDate.format('MM')), parseInt(fromDate.format('DD')))
    const fromDate = new Date(req.body.fromDate)
    const toDate = new Date(req.body.toDate)
    var paymentFees = await PaymentFee.find({
      'datePaid': {
        '$gte': fromDate,
        '$lte': toDate
      },
      'cashTendered': {
        '$ne': 0
      }
    }).populate([
      {
        path: 'enrollmentFee',
        model: 'EnrollmentFees',
        populate: [
          {
            path: 'enrollment',
            model: 'Enrollments',
            select: ['-fees']
          }
        ]
      }
    ]).exec()

    var registrationFee = paymentFees.filter((rf) =>
      rf.enrollmentFee.name === 'Registration Fees' &&
      rf.isPaid)
    var books = paymentFees.filter((rf) =>
      rf.enrollmentFee.name === 'Books' &&
      rf.isPaid)
    var tuitionFee = paymentFees.filter((rf) =>
      rf.enrollmentFee.name === 'Tuition Fees' &&
      rf.isPaid)
    var miscellanousFee = paymentFees.filter((rf) =>
      rf.enrollmentFee.name === 'Miscellaneous Fees' &&
      rf.isPaid)
    var otherFees = paymentFees.filter((rf) =>
      (rf.enrollmentFee.name !== 'Miscellaneous Fees' && rf.enrollmentFee.name !== 'Tuition Fees' && rf.enrollmentFee.name !== 'Books' && rf.enrollmentFee.name !== 'Registration Fees') &&
      rf.isPaid)
    var registrationFeeTotal = calculateTotal(registrationFee)
    var tuitionFeeTotal = calculateTotal(tuitionFee)
    var booksTotal = calculateTotal(books)
    var miscellanousFeeTotal = calculateTotal(miscellanousFee)
    var otherFeesTotal = calculateTotal(otherFees)

    var overAllTotal = registrationFeeTotal + tuitionFeeTotal + booksTotal + miscellanousFeeTotal + otherFeesTotal

    var registrationFeePercentage = calculatePercentage(registrationFeeTotal, overAllTotal)
    var tuitionFeePercentage = calculatePercentage(tuitionFeeTotal, overAllTotal)
    var booksPercentage = calculatePercentage(booksTotal, overAllTotal)
    var miscellanousFeePercentage = calculatePercentage(miscellanousFeeTotal, overAllTotal)
    var otherFeesPercentage = calculatePercentage(otherFeesTotal, overAllTotal)
    var nonePercentage = 0
    if (overAllTotal === 0) {
      nonePercentage = 100
    }
    res.send({
      details: 'Monthly Payment Listed!'
    })
    socketio.emit('MonthlyPayments', { overAllTotal: overAllTotal,
      series: [booksPercentage, registrationFeePercentage, tuitionFeePercentage, miscellanousFeePercentage, otherFeesPercentage, nonePercentage],
      labels: ['Books', 'Registration Fees', 'Tuition Fees', 'Miscellanous Fees', 'Others', 'No Payments'] })
  },
  async Weekly (req, res) {
    var socketio = req.app.get('socketio')
    var series = []
    // const now = new Date()
    // const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    var paymentFees = await PaymentFee.find({
      'datePaid': {
        '$gte': req.body.fromDate
      },
      'cashTendered': {
        '$ne': 0
      }
    }).populate([
      {
        path: 'enrollmentFee',
        model: 'EnrollmentFees',
        populate: [
          {
            path: 'enrollment',
            model: 'Enrollments',
            select: ['-fees']
          }
        ]
      }
    ]).exec()

    var registrationFee = paymentFees.filter((rf) =>
      rf.enrollmentFee.name === 'Registration Fees' &&
      rf.isPaid)
    var books = paymentFees.filter((rf) =>
      rf.enrollmentFee.name === 'Books' &&
      rf.isPaid)
    var tuitionFee = paymentFees.filter((rf) =>
      rf.enrollmentFee.name === 'Tuition Fees' &&
      rf.isPaid)
    var miscellanousFee = paymentFees.filter((rf) =>
      rf.enrollmentFee.name === 'Miscellaneous Fees' &&
      rf.isPaid)
    var otherFees = paymentFees.filter((rf) =>
      (rf.enrollmentFee.name !== 'Miscellaneous Fees' && rf.enrollmentFee.name !== 'Tuition Fees' && rf.enrollmentFee.name !== 'Books' && rf.enrollmentFee.name !== 'Registration Fees') &&
      rf.isPaid)
    var registrationFeeTotal = calculateTotal(registrationFee)
    var tuitionFeeTotal = calculateTotal(tuitionFee)
    var booksTotal = calculateTotal(books)
    var miscellanousFeeTotal = calculateTotal(miscellanousFee)
    var otherFeesTotal = calculateTotal(otherFees)

    var overAllTotal = registrationFeeTotal + tuitionFeeTotal + booksTotal + miscellanousFeeTotal + otherFeesTotal

    res.send({
      details: 'Weekly Payment Listed!'
    })
    socketio.emit('DailyPayments', { overAllTotal: overAllTotal,
      series: series,
      labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] })
  }
}
