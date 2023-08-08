'use strict'

const PaymentFee = require('../../../models/PaymentFees')
const Enrollment = require('../../../models/Enrollment')
const EnrollmentFee = require('../../../models/EnrollmentFees')
const SchoolYear = require('../../../models/SchoolYear')
const Student = require('../../../models/Student')

module.exports = {
  async Show (req, res) {
    try {
      await EnrollmentFee.findById(req.params.id).populate([
        {
          path: 'enrollment',
          model: 'Enrollments',
          select: ['-fees']
        },
        {
          path: 'payments',
          model: 'PaymentFees',
          populate: [
            {
              path: 'receipt',
              model: 'Receipts',
              select: ['-paymentFee']
            }
          ]
        }
      ]).exec(async function (err, enrollment) {
        if (err) {
          res.status(404).json({ 'error': 'not found', 'err': err })
          return
        }
        await SchoolYear.findOne({ code: enrollment.enrollment.schoolYearCode }).exec(function (err, schoolYear) {
          if (err) {
            res.status(404).json({ 'error': 'not found', 'err': err })
            return
          }
          res.send({ enrollment, schoolYear })
        })
      })
    } catch (err) {
      console.log(err)
      res.status(400).send({
        error: 'Whoops! Something Went Wrong. Please Try Again'
      })
    }
  },
  async Update (req, res) {
    var socketio = req.app.get('socketio')
    try {
      await EnrollmentFee.Update(EnrollmentFee, PaymentFee, req, function (err, enrollment) {
        if (err) throw err
        if (enrollment) {
          Enrollment.updateOne({ _id: req.body.enrollment._id }, { $set: { isReserved: true } }).exec()
          EnrollmentFee.findById(req.params.id).populate([{
            path: 'fees',
            model: 'EnrollmentFees'
          },
          {
            path: 'enrollment',
            model: 'Enrollments',
            select: ['-fees']
          },
          {
            path: 'payments',
            model: 'PaymentFees',
            populate: [
              {
                path: 'enrollmentFee',
                model: 'EnrollmentFees'
              },
              {
                path: 'receipt',
                model: 'Receipts',
                select: ['-paymentFee']
              }
            ]
          }
          ]).exec(async function (errEnrollment, response) {
            if (errEnrollment) {
              res.status(404).json({ 'error': 'not found', 'err': errEnrollment })
              throw err
            } else {
              var student = await Student.findOne({ studentNumber: response.enrollment.studentNumber }).exec()
              response.SendEmail({ enrollmentFee: response, student: student })
              res.status(200).send({
                details: 'updated!'
              })
              socketio.emit('ShowEnrollment', response)
            }
          })
        }
      })
    } catch (err) {
      console.log(err)
      res.send({
        error: err
      })
    }
  }
}
