'use strict'

const Enrollment = require('../../../models/Enrollment')
const EnrollmentFee = require('../../../models/EnrollmentFees')
const PaymentFee = require('../../../models/PaymentFees')
const SchoolYear = require('../../../models/SchoolYear')
const { parseDocumentStatus } = require('../../../helpers/enums')
const Excel = require('exceljs')
const _ = require('lodash')
const moment = require('moment')
module.exports = {
  async Index (req, res) {
    var socketio = req.app.get('socketio')
    var params = {}
    if (req.user.branch !== null) {
      params['branch'] = req.user.branch
    }
    await Enrollment.find(params).select('-fees').exec(function (errEnrollment, response) {
      if (errEnrollment) {
        res.status(404).json({'error': 'not found', 'err': errEnrollment})
        throw errEnrollment
      } else {
        socketio.emit('EnrollmentList', response)
        res.send({
          details: 'Enrollment Listed!'
        })
      }
    })
  },
  async Store (req, res) {
    // var socketio = req.app.get('socketio')
    try {
      await Enrollment.Store(Enrollment, EnrollmentFee, PaymentFee, SchoolYear, req.body, req.user, async function (err, enrollment) {
        if (err) throw err
        if (enrollment) {
          await Enrollment.findById(enrollment._id).populate([{
            path: 'fees',
            model: 'EnrollmentFees',
            populate: [
              {
                path: 'payments',
                model: 'PaymentFees'
              }
            ]
          }]).exec(async function (_enErr, theEnrollment) {
            res.send({
              details: 'stored!',
              enrollmentId: enrollment._id
            })
          })
        }
      })
    } catch (err) {
      console.log(err)
      res.setHeader('Content-Type', 'application/json; charset=utf-8').status(400).send({
        error: 'Whoops! Something Went Wrong. Please Try Again'
      })
    }
  },
  async Show (req, res) {
    try {
      await Enrollment.findById(req.params.id)
        .populate([{
          path: 'fees',
          model: 'EnrollmentFees',
          populate: [
            {
              path: 'payments',
              model: 'PaymentFees',
              populate: [
                {
                  path: 'receipt',
                  model: 'Receipts'
                },
                {
                  path: 'userId',
                  model: 'Users'
                }
              ]
            }
          ]
        }]).exec(function (err, enrollment) {
          if (err) {
            res.status(404).json({'error': 'not found', 'err': err})
            return
          }
          res.send(enrollment)
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
      await Enrollment.Update(Enrollment, EnrollmentFee, req, function (err, enrollment) {
        if (err) throw err
        if (enrollment) {
          Enrollment.findById(req.params.id).populate([{ path: 'fees', model: 'EnrollmentFees' }]).exec(function (errEnrollment, response) {
            if (errEnrollment) {
              res.status(404).json({'error': 'not found', 'err': errEnrollment})
              throw err
            } else {
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
      res.status(400).send({
        error: 'Whoops! Something Went Wrong. Please Try Again'
      })
    }
  },
  async UpdatePost (req, res) {
    var socketio = req.app.get('socketio')
    try {
      await Enrollment.UpdatePost(Enrollment, EnrollmentFee, req, function (err, enrollment) {
        if (err) throw err
        if (enrollment) {
          Enrollment.findById(req.params.id).populate([{ path: 'fees', model: 'EnrollmentFees' }]).exec(function (errEnrollment, response) {
            if (errEnrollment) {
              res.status(404).json({'error': 'not found', 'err': errEnrollment})
              throw err
            } else {
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
      res.status(400).send({
        error: 'Whoops! Something Went Wrong. Please Try Again'
      })
    }
  },
  async ApproveStatus (req, res) {
    var socketio = req.app.get('socketio')
    try {
      await Enrollment.ApproveStatus(Enrollment, req, function (err, enrollment) {
        if (err) throw err
        if (enrollment) {
          Enrollment.findById(req.params._id).populate([{ path: 'fees', model: 'EnrollmentFees' }]).exec(function (errEnrollment, response) {
            if (errEnrollment) {
              res.status(404).json({'error': 'not found', 'err': errEnrollment})
              throw err
            } else {
              res.status(200).send({
                details: 'status updated!'
              })
              socketio.emit('ShowEnrollment', response)
            }
          })
        }
      })
    } catch (err) {
      console.log(err)
      res.status(400).send({
        error: 'Whoops! Something Went Wrong. Please Try Again'
      })
    }
  },
  async DisapproveStatus (req, res) {
    var socketio = req.app.get('socketio')
    try {
      await Enrollment.DisapproveStatus(Enrollment, req, function (err, enrollment) {
        if (err) throw err
        if (enrollment) {
          Enrollment.findById(req.params._id).populate([{ path: 'fees', model: 'EnrollmentFees' }]).exec(function (errEnrollment, response) {
            if (errEnrollment) {
              res.status(404).json({'error': 'not found', 'err': errEnrollment})
              throw err
            } else {
              res.status(200).send({
                details: 'status updated!'
              })
              socketio.emit('ShowEnrollment', response)
            }
          })
        }
      })
    } catch (err) {
      console.log(err)
      res.status(400).send({
        error: 'Whoops! Something Went Wrong. Please Try Again'
      })
    }
  },
  async Delete (req, res) {
    var socketio = req.app.get('socketio')
    try {
      await Enrollment.Delete(Enrollment, req.body, function (err, enrollment) {
        if (err) throw err
        if (enrollment) {
          Enrollment.find({}, function (errEnrollment, response) {
            if (errEnrollment) {
              res.status(404).json({'error': 'not found', 'err': errEnrollment})
              throw err
            } else {
              res.send({
                details: 'Enrollment Deleted!'
              })
              socketio.emit('EnrollmentList', response)
            }
          })
        }
      })
    } catch (err) {
      console.log(err)
      res.status(400).send({
        error: 'Whoops! Something Went Wrong. Please Try Again'
      })
    }
  },
  async ValidateStudentIfAlreadyEnrolled (req, res) {
    try {
      await Enrollment.countDocuments({ studentNumber: req.body.studentNumber, schoolYearCode: req.body.schoolYearCode }, function (err, count) {
        if (err) throw err
        console.log('there are %d enrolled students', count)
      })
    } catch (err) {
      console.log(err)
      res.status(400).send({
        error: 'Whoops! Something Went Wrong. Please Try Again'
      })
    }
  },
  async EnrolledStudent (req, res) {
    try {
      await Enrollment.find({ schoolYearCode: req.body.schoolYearCode }).exec(function (err, enrollment) {
        if (err) {
          res.status(404).json({'error': 'not found', 'err': err})
          return
        }
        const ExcelJS = require('exceljs')
        var workbook = new ExcelJS.Workbook()

        var enrollmentWorkSheet = workbook.addWorksheet('Enrolled')
        enrollmentWorkSheet.columns = [
          {
            header: 'Enrollment No.',
            key: 'number',
            width: 20
          },
          {
            header: 'Date Enrolled',
            key: 'created_at',
            width: 20
          },
          {
            header: 'Student No.',
            key: 'studentNumber',
            width: 20
          },
          {
            header: 'Student Name',
            key: 'studentName',
            width: 36
          },
          {
            header: 'Grade/Level',
            key: 'levelCode',
            width: 20
          },
          {
            header: 'Grade/Level Description',
            key: 'levelDescription',
            width: 20
          },
          {
            header: 'Status',
            key: 'documentStatus',
            width: 20
          }
        ]
        enrollmentWorkSheet.getRow(1).fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '1877F2' }
        }
        enrollmentWorkSheet.eachRow(function (row, rowNumber) {
          row.eachCell(function (cell, colNumber) {
            row.getCell(colNumber).font = { color: { argb: 'ffffff' }, 'bold': true }
          })
        })
        enrollment.forEach((enrollmentItem, enrollmentIndex) => {
          enrollmentWorkSheet.addRow({
            number: enrollmentItem.number,
            created_at: enrollmentItem.created_at,
            studentNumber: enrollmentItem.studentNumber,
            studentName: enrollmentItem.studentName,
            levelCode: enrollmentItem.levelCode,
            levelDescription: enrollmentItem.levelDescription,
            documentStatus: parseDocumentStatus(enrollmentItem.documentStatus)
          })
        })
        workbook.xlsx.writeFile(`storage/downloads/Enrollment.xlsx`)
          .then(function () {
            res.download(`storage/downloads/Enrollment.xlsx`, function (err) {
              console.log('---------- error downloading file: ' + err)
            })
          })
      })
    } catch (err) {

    }
  },
  async CountEnrollment (req, res) {
    var total = await Enrollment.find({ studentNumber: req.params.studentNumber }).countDocuments()
    res.send({
      total: total
    })
  },
  async GenerateSOAReport (req, res) {
    res.setHeader('Content-disposition', 'attachment; filename=' + 'StudentSOA.xlsx')
    res.setHeader('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')

    var enrollee = await Enrollment.findById(req.body._id).populate([{
      path: 'fees',
      model: 'EnrollmentFees',
      populate: [
        {
          path: 'payments',
          model: 'PaymentFees',
          populate: [
            {
              path: 'receipt',
              model: 'Receipts'
            },
            {
              path: 'userId',
              model: 'Users'
            }
          ]
        }
      ]
    }]).exec()

    var workbook = new Excel.Workbook()

    var soalist = []

    workbook.xlsx.readFile(`${__dirname}/../../../database/data/StatementOfAccount.xlsx`)
      .then(async function () {
        var monthValues = req.body.monthValues
        var books = enrollee.fees.find((rf) => rf.name === 'Books')
        var registrationFee = enrollee.fees.find((rf) => rf.name === 'Registration Fees')
        var tuitionFee = enrollee.fees.find((rf) => rf.name === 'Tuition Fees')
        var miscellanousFee = enrollee.fees.find((rf) => rf.name === 'Miscellaneous Fees')
        var eventFee = enrollee.fees.find((rf) => rf.name === 'Event Fee')
        // var parangalFee = enrollee.fees.find((rf) => rf.name === 'Parangal Fee')
        var fieldTrip = enrollee.fees.find((rf) => rf.name === 'Field Trip')
        var royalBall = enrollee.fees.find((rf) => rf.name === 'Royal Ball')
        var yearBook = enrollee.fees.find((rf) => rf.name === 'Annual Yearbook Graduating')
        var framedGradPicture = enrollee.fees.find((rf) => rf.name === 'Framed Grad Piture')
        var diploma = enrollee.fees.find((rf) => rf.name === 'Framed Diploma, Theca, Framed Grad Picture')
        var supplies = enrollee.fees.find((rf) => rf.name === 'Supplies - All Students')
        // var pins = enrollee.fees.filter((rf) => rf.name === 'Pin')
        // var nameplates = enrollee.fees.filter((rf) => rf.name === 'Nameplate')
        // var uniforms = enrollee.fees.filter((rf) => rf.name === 'Uniform')
        // var vans = enrollee.fees.filter((rf) => rf.name === 'Van')

        /*
        *
        *
        * Required Fees section
        * */
        if (!_.isEmpty(books)) {
          soalist.push([
            (books.payments[0].datePaid && books.payments[0].isPaid) ? moment(books.payments[0].datePaid).format('MM/DD/YYYY') : '',
            (books.payments[0].userId && books.payments[0].isPaid) ? `${books.payments[0].userId.givenName} ${books.payments[0].userId.lastName}` : '',
            (books.payments[0].receipt && books.payments[0].isPaid) ? books.payments[0].receipt.orNumber : 'None',
            books.payments[0].amountToPayPerMonth,
            '', '', '', '', '', '', '', '', '', '', '', '', '', '',
            books.payments[0].amountDue
          ])
        }
        if (!_.isEmpty(registrationFee)) {
          soalist.push([
            moment(registrationFee.payments[0].datePaid).format('MM/DD/YYYY'),
            (registrationFee.payments[0].userId) ? `${registrationFee.payments[0].userId.givenName} ${registrationFee.payments[0].userId.lastName}` : '',
            (registrationFee.payments[0].receipt) ? registrationFee.payments[0].receipt.orNumber : '',
            '',
            registrationFee.payments[0].amountToPayPerMonth, '', '', '', '', '', '', '', '', '', '', '', '', '',
            registrationFee.payments[0].amountDue
          ])
        }
        if (!_.isEmpty(tuitionFee)) {
          var amountIndexPosition = 5
          var emptyIndexToAdd = parseInt(monthValues.length)
          tuitionFee.payments.forEach((paymentItem, paymentIndex) => {
            if (paymentItem.receipt !== null && paymentItem.isPaid) {
              var soaItem = [
                (paymentItem.datePaid && paymentItem.isPaid) ? moment(paymentItem.datePaid).format('MM/DD/YYYY') : '',
                (paymentItem.userId && paymentItem.isPaid) ? `${paymentItem.userId.givenName} ${paymentItem.userId.lastName}` : '',
                (paymentItem.receipt && paymentItem.isPaid) ? paymentItem.receipt.orNumber : ''
              ]
              for (var i = 0; i < amountIndexPosition; i++) {
                if (i === 3) {
                  soaItem.push(tuitionFee.amount + miscellanousFee.amount)
                } else if (i === 4) {
                  soaItem.push(paymentItem.amountToPayPerMonth + miscellanousFee.payments[paymentIndex].amountToPayPerMonth)
                } else {
                  soaItem.push('')
                }
              }
              soaItem.push(paymentItem.amountToPayPerMonth + miscellanousFee.payments[paymentIndex].amountToPayPerMonth)
              amountIndexPosition = amountIndexPosition + 1
              /* after */
              emptyIndexToAdd = emptyIndexToAdd - 1
              for (var j = 0; j < emptyIndexToAdd; j++) {
                soaItem.push('')
              }
              soaItem.push(paymentItem.amountDue + miscellanousFee.payments[paymentIndex].amountDue)
              soalist.push(soaItem)
            }
          })
        }

        var rowNumber = 7
        var workSheet = workbook.getWorksheet('Statement Of Account')
        var tlevelCode = `${enrollee.levelCode[enrollee.levelCode.length - 2]}${enrollee.levelCode[enrollee.levelCode.length - 1]}`
        workSheet.getCell('A1').value = tlevelCode
        workSheet.getCell('C3').value = enrollee.studentNumber
        workSheet.getCell('C4').value = enrollee.studentName
        workSheet.getCell('N1').value = req.body.serialNo
        workSheet.getCell('J2').value = `Serial No.: ${req.body.schoolYear}`
        soalist.forEach((tmItem, tmIndex) => {
          workSheet.spliceRows(rowNumber, 1, tmItem)
          var theRowOnProcess = workSheet.getRow(rowNumber)
          theRowOnProcess.eachCell(function (cell, colNumber) {
            if (colNumber > 3) {
              theRowOnProcess.getCell(colNumber).numFmt = '0.00'
            }
            theRowOnProcess.getCell(colNumber).border = {
              top: {style: 'thin'},
              left: {style: 'thin'},
              bottom: {style: 'thin'},
              right: {style: 'thin'}
            }
          })
          rowNumber++
        })

        /*
        *
        *
        * Anticipated Events section
        * */

        if (eventFee && eventFee.payments.length !== 0) {
          if (eventFee.payments[0].isPaid) {
            workSheet.getCell('A23').value = moment(eventFee.payments[0].datePaid).format('MM/DD/YYYY')
            workSheet.getCell('B23').value = (eventFee.payments[0].userId) ? `${eventFee.payments[0].userId.givenName} ${eventFee.payments[0].userId.lastName}` : ''
            workSheet.getCell('C23').value = eventFee.payments[0].receipt.orNumber
            workSheet.getCell('H23').value = (eventFee.payments[0].amountDue) ? eventFee.payments[0].amountDue : ''
            workSheet.getCell('I23').value = (eventFee.payments[0].isPaid) ? 'Paid' : 'Unpaid'
          }
        }

        if (fieldTrip && fieldTrip.payments.length !== 0) {
          if (fieldTrip.payments[0].isPaid) {
            workSheet.getCell('A24').value = moment(fieldTrip.payments[0].datePaid).format('MM/DD/YYYY')
            workSheet.getCell('B24').value = (fieldTrip.payments[0].userId) ? `${fieldTrip.payments[0].userId.givenName} ${fieldTrip.payments[0].userId.lastName}` : ''
            workSheet.getCell('C24').value = fieldTrip.payments[0].receipt.orNumber
            workSheet.getCell('H24').value = (fieldTrip.payments[0].amountDue) ? fieldTrip.payments[0].amountDue : ''
            workSheet.getCell('I24').value = (fieldTrip.payments[0].isPaid) ? 'Paid' : 'Unpaid'
          }
        }

        if (royalBall && royalBall.payments.length !== 0) {
          if (royalBall.payments[0].isPaid) {
            workSheet.getCell('A25').value = moment(royalBall.payments[0].datePaid).format('MM/DD/YYYY')
            workSheet.getCell('B25').value = (royalBall.payments[0].userId) ? `${royalBall.payments[0].userId.givenName} ${royalBall.payments[0].userId.lastName}` : ''
            workSheet.getCell('C25').value = royalBall.payments[0].receipt.orNumber
            workSheet.getCell('H25').value = (royalBall.payments[0].amountDue) ? royalBall.payments[0].amountDue : ''
            workSheet.getCell('I25').value = (royalBall.payments[0].isPaid) ? 'Paid' : 'Unpaid'
          }
        }

        if (supplies && supplies.payments.length !== 0) {
          if (supplies.payments[0].isPaid) {
            workSheet.getCell('A26').value = moment(supplies.payments[0].datePaid).format('MM/DD/YYYY')
            workSheet.getCell('B26').value = (supplies.payments[0].userId) ? `${supplies.payments[0].userId.givenName} ${supplies.payments[0].userId.lastName}` : ''
            workSheet.getCell('C26').value = supplies.payments[0].receipt.orNumber
            workSheet.getCell('H26').value = (supplies.payments[0].amountDue) ? supplies.payments[0].amountDue : ''
            workSheet.getCell('I26').value = (supplies.payments[0].isPaid) ? 'Paid' : 'Unpaid'
          }
        }

        var coat = enrollee.fees.filter((rf) => (rf.name === 'Uniform' && rf.description.toLowerCase().includes('coat')) || rf.name.includes('Textile'))
        var coatTotalAmount = 0
        var coatReceipts = []
        var coatUser = []
        var unpaidCoat = 0
        var paidCoat = 0
        coat.forEach((coatItem, coatIndex) => {
          if (coatItem.payments.length !== 0) {
            if (coatItem.payments[0].isPaid) {
              coatTotalAmount += coatItem.payments[0].amountDue
              coatReceipts.push((coatItem.payments[0].receipt) ? coatItem.payments[0].receipt.orNumber : '')
              coatUser.push((coatItem.payments[0].userId) ? `${coatItem.payments[0].userId.givenName} ${coatItem.payments[0].userId.lastName}` : '')
              paidCoat += 1
            }
          } else {
            unpaidCoat += 1
          }
        })

        if (coatTotalAmount !== 0) {
          workSheet.getCell('A27').value = ''
          workSheet.getCell('B27').value = coatUser
          workSheet.getCell('C27').value = coatReceipts
          workSheet.getCell('H27').value = coatTotalAmount
          workSheet.getCell('I27').value = `Paid: ${paidCoat}, Unpaid: ${unpaidCoat}`
        }

        var uniform = enrollee.fees.filter((rf) => rf.name === 'Uniform' && (rf.description.toLowerCase().includes('pe') || rf.description.toLowerCase().includes('kvs')))
        var uniformTotalAmount = 0
        var uniformReceipts = []
        var uniformUser = []
        var unpaiduniform = 0
        var paiduniform = 0
        uniform.forEach((uniformItem, uniformIndex) => {
          if (uniformItem.payments.length !== 0) {
            if (uniformItem.payments[0].isPaid) {
              uniformTotalAmount += uniformItem.payments[0].amountDue
              uniformReceipts.push((uniformItem.payments[0].receipt) ? uniformItem.payments[0].receipt.orNumber : '')
              uniformUser.push((uniformItem.payments[0].userId) ? `${uniformItem.payments[0].userId.givenName} ${uniformItem.payments[0].userId.lastName}` : '')
              paiduniform += 1
            }
          } else {
            unpaiduniform += 1
          }
        })
        if (uniformTotalAmount !== 0) {
          workSheet.getCell('A28').value = ''
          workSheet.getCell('B28').value = uniformUser
          workSheet.getCell('C28').value = uniformReceipts
          workSheet.getCell('H28').value = uniformTotalAmount
        }
        workSheet.getCell('I28').value = `Paid: ${paiduniform}, Unpaid: ${unpaiduniform}`

        var pinNameplate = enrollee.fees.filter((rf) => rf.name === 'Nameplate' || rf.name === 'Pin')
        var pinNameplateTotalAmount = 0
        var pinNameplateReceipts = []
        var pinNameplateUser = []
        var unpaidpinNameplate = 0
        var paidpinNameplate = 0
        pinNameplate.forEach((pinNameplateItem, pinNameplateIndex) => {
          if (pinNameplateItem.payments.length !== 0) {
            if (pinNameplateItem.payments[0].isPaid) {
              pinNameplateTotalAmount += pinNameplateItem.payments[0].amountDue
              pinNameplateReceipts.push((pinNameplateItem.payments[0].receipt) ? pinNameplateItem.payments[0].receipt.orNumber : '')
              pinNameplateUser.push((pinNameplateItem.payments[0].userId) ? `${pinNameplateItem.payments[0].userId.givenName} ${pinNameplateItem.payments[0].userId.lastName}` : '')
              paidpinNameplate += 1
            } else {
              unpaidpinNameplate += 1
            }
          }
        })
        if (pinNameplateTotalAmount !== 0) {
          workSheet.getCell('A29').value = ''
          workSheet.getCell('B29').value = pinNameplateUser
          workSheet.getCell('C29').value = pinNameplateReceipts
          workSheet.getCell('H29').value = pinNameplateTotalAmount
        }
        workSheet.getCell('I29').value = `Paid: ${paidpinNameplate}, Unpaid: ${unpaidpinNameplate}`

        /*
        *
        *
        * Selective Fees
        * */

        var pfCellNumber = (tlevelCode === '01' || tlevelCode === '06' || tlevelCode === '12') ? 23 : 24
        var parangalFee = enrollee.fees.find((rf) => rf.name === 'Parangal Fee')
        if (parangalFee && parangalFee.payments.length !== 0) {
          if (parangalFee.payments[0].isPaid) {
            workSheet.getCell(`J${pfCellNumber}`).value = moment(parangalFee.payments[0].datePaid).format('MM/DD/YYYY')
            workSheet.getCell(`K${pfCellNumber}`).value = (parangalFee.payments[0].userId) ? `${parangalFee.payments[0].userId.givenName} ${parangalFee.payments[0].userId.lastName}` : ''
            workSheet.getCell(`L${pfCellNumber}`).value = (parangalFee.payments[0].receipt) ? parangalFee.payments[0].receipt.orNumber : ''
            workSheet.getCell(`R${pfCellNumber}`).value = parangalFee.payments[0].amountDue
            workSheet.getCell(`S${pfCellNumber}`).value = (parangalFee.payments[0].isPaid) ? 'Paid' : 'Unpaid'
          }
        }

        if (yearBook && yearBook.payments.length !== 0) {
          if (yearBook.payments[0].isPaid) {
            workSheet.getCell('J25').value = moment(yearBook.payments[0].datePaid).format('MM/DD/YYYY')
            workSheet.getCell('K25').value = (yearBook.payments[0].userId) ? `${yearBook.payments[0].userId.givenName} ${yearBook.payments[0].userId.lastName}` : ''
            workSheet.getCell('L25').value = (yearBook.payments[0].receipt) ? yearBook.payments[0].receipt.orNumber : ''
            workSheet.getCell('R25').value = parangalFee.payments[0].amountDue
            workSheet.getCell('S25').value = (yearBook.payments[0].isPaid) ? 'Paid' : 'Unpaid'
          }
        }

        var frameGradPic = enrollee.fees.find((rf) => rf.name === 'Framed Grad Piture')
        if (frameGradPic && frameGradPic.payments.length !== 0) {
          if (frameGradPic.payments[0].isPaid) {
            workSheet.getCell('J26').value = moment(frameGradPic.payments[0].datePaid).format('MM/DD/YYYY')
            workSheet.getCell('K26').value = (frameGradPic.payments[0].userId) ? `${frameGradPic.payments[0].userId.givenName} ${frameGradPic.payments[0].userId.lastName}` : ''
            workSheet.getCell('L26').value = (frameGradPic.payments[0].receipt) ? frameGradPic.payments[0].receipt.orNumber : ''
            workSheet.getCell('R26').value = frameGradPic.payments[0].amountDue
            workSheet.getCell('S26').value = (frameGradPic.payments[0].isPaid) ? 'Paid' : 'Unpaid'
          }
        }

        var frameGradPicTheca = diploma
        if (frameGradPicTheca && frameGradPicTheca.payments.length !== 0) {
          if (frameGradPicTheca.payments[0].isPaid) {
            workSheet.getCell('J27').value = moment(frameGradPicTheca.payments[0].datePaid).format('MM/DD/YYYY')
            workSheet.getCell('K27').value = (frameGradPicTheca.payments[0].userId) ? `${frameGradPicTheca.payments[0].userId.givenName} ${frameGradPicTheca.payments[0].userId.lastName}` : ''
            workSheet.getCell('L27').value = (frameGradPicTheca.payments[0].receipt) ? frameGradPicTheca.payments[0].receipt.orNumber : ''
            workSheet.getCell('R27').value = frameGradPic.payments[0].amountDue
            workSheet.getCell('S27').value = (frameGradPicTheca.payments[0].isPaid) ? 'Paid' : 'Unpaid'
          }
        }

        workbook.xlsx.writeFile('storage/downloads/StatementOfAccount.xlsx').then(function () {
          res.download('storage/downloads/StatementOfAccount.xlsx', function (err) {
            console.log('---------- error downloading file: ' + err)
          })
        })
      })
  },
  async GenerateSOAReportxxx (req, res) {
    res.setHeader('Content-disposition', 'attachment; filename=' + 'StudentSOA.xlsx')
    res.setHeader('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')

    const Excel = require('exceljs')

    var workbook = new Excel.Workbook()
    // workbook.xlsx.readFile('storage/downloads/StatementOfAccount.xlsx')
    workbook.xlsx.readFile(`${__dirname}/../../../database/data/StatementOfAccount.xlsx`)
      .then(async function () {
        const moment = require('moment')
        var tmSection = []
        var monthValues = req.body.monthValues
        var student = await Enrollment.findById(req.body._id)
          .populate([{
            path: 'fees',
            model: 'EnrollmentFees',
            populate: [
              {
                path: 'payments',
                model: 'PaymentFees',
                populate: [
                  {
                    path: 'receipt',
                    model: 'Receipts'
                  },
                  {
                    path: 'userId',
                    model: 'Users'
                  }
                ]
              }
            ]
          }]).exec()
        var books = student.fees.find((rf) => rf.name === 'Books')
        var registrationFee = student.fees.find((rf) => rf.name === 'Registration Fees')
        var miscellaneousFee = student.fees.find((rf) => rf.name === 'Miscellaneous Fees')
        var tuitionFee = student.fees.find((rf) => rf.name === 'Tuition Fees')

        tmSection.push([
          moment(books.payments[0].datePaid).format('MM/DD/YYYY'),
          (books.payments[0].userId) ? `${books.payments[0].userId.givenName} ${books.payments[0].userId.lastName}` : '',
          (books.payments[0].receipt) ? books.payments[0].receipt.orNumber : '',
          books.payments[0].amountToPayPerMonth,
          '', '', '', '', '', '', '', '', '', '', '', '', '', '',
          books.payments[0].amountDue
        ])
        tmSection.push([
          moment(registrationFee.payments[0].datePaid).format('MM/DD/YYYY'),
          (registrationFee.payments[0].userId) ? `${registrationFee.payments[0].userId.givenName} ${registrationFee.payments[0].userId.lastName}` : '',
          (registrationFee.payments[0].receipt) ? registrationFee.payments[0].receipt.orNumber : '',
          '',
          registrationFee.payments[0].amountToPayPerMonth, '', '', '', '', '', '', '', '', '', '', '', '', '',
          registrationFee.payments[0].amountDue
        ])
        tmSection.push([
          moment(miscellaneousFee.payments[0].datePaid).format('MM/DD/YYYY'),
          (miscellaneousFee.payments[0].userId) ? `${miscellaneousFee.payments[0].userId.givenName} ${miscellaneousFee.payments[0].userId.lastName}` : '',
          (miscellaneousFee.payments[0].receipt) ? miscellaneousFee.payments[0].receipt.orNumber : '',
          '', '',
          miscellaneousFee.payments[0].amountToPayPerMonth, '', '', '', '', '', '', '', '', '', '', '', '',
          miscellaneousFee.payments[0].amountDue
        ])
        var amountIndexPosition = 6
        var emptyIndexToAdd = parseInt(monthValues.length)
        tuitionFee.payments.forEach((paymentItem, paymentIndex) => {
          if (paymentItem.receipt !== null && paymentItem.isPaid) {
            var theTmSection = [
              moment(paymentItem.datePaid).format('MM/DD/YYYY'),
              (paymentItem.userId) ? `${paymentItem.userId.givenName} ${paymentItem.userId.lastName}` : '',
              (paymentItem.receipt) ? paymentItem.receipt.orNumber : ''
            ]
            for (var i = 0; i < amountIndexPosition; i++) {
              theTmSection.push('')
            }
            theTmSection.push(paymentItem.amountToPayPerMonth)
            amountIndexPosition = amountIndexPosition + 1
            /* after */
            emptyIndexToAdd = emptyIndexToAdd - 1
            for (var j = 0; j < emptyIndexToAdd; j++) {
              theTmSection.push('')
            }
            theTmSection.push(paymentItem.amountDue)
            tmSection.push(theTmSection)
          }
        })
        var rowNumber = 7
        var workSheet = workbook.getWorksheet('Statement Of Account')
        var tlevelCode = `${student.levelCode[student.levelCode.length - 2]}${student.levelCode[student.levelCode.length - 1]}`
        workSheet.getCell('A1').value = tlevelCode
        workSheet.getCell('C3').value = student.studentNumber
        workSheet.getCell('C4').value = student.studentName
        workSheet.getCell('N1').value = req.body.serialNo
        workSheet.getCell('J2').value = `Serial No.: ${req.body.schoolYear}`
        tmSection.forEach((tmItem, tmIndex) => {
          workSheet.spliceRows(rowNumber, 1, tmItem)
          var theRowOnProcess = workSheet.getRow(rowNumber)
          theRowOnProcess.eachCell(function (cell, colNumber) {
            if (colNumber > 3) {
              theRowOnProcess.getCell(colNumber).numFmt = '0.00'
            }
            theRowOnProcess.getCell(colNumber).border = {
              top: {style: 'thin'},
              left: {style: 'thin'},
              bottom: {style: 'thin'},
              right: {style: 'thin'}
            }
          })
          rowNumber++
        })
        var eventFee = student.fees.find((rf) => rf.name === 'Event Fee')
        if (eventFee && eventFee.payments.length !== 0) {
          if (eventFee.payments[0].isPaid) {
            workSheet.getCell('A23').value = moment(eventFee.payments[0].datePaid).format('MM/DD/YYYY')
            workSheet.getCell('B23').value = (eventFee.payments[0].userId) ? `${eventFee.payments[0].userId.givenName} ${eventFee.payments[0].userId.lastName}` : ''
            workSheet.getCell('C23').value = eventFee.payments[0].receipt.orNumber
            workSheet.getCell('J23').value = (eventFee.payments[0].isPaid) ? 'Paid' : 'Unpaid'
          }
        }
        var fieldTrip = student.fees.find((rf) => rf.name === 'Field Trip')
        if (fieldTrip && fieldTrip.payments.length !== 0) {
          if (fieldTrip.payments[0].isPaid) {
            workSheet.getCell('A24').value = moment(fieldTrip.payments[0].datePaid).format('MM/DD/YYYY')
            workSheet.getCell('B24').value = (fieldTrip.payments[0].userId) ? `${fieldTrip.payments[0].userId.givenName} ${fieldTrip.payments[0].userId.lastName}` : ''
            workSheet.getCell('C24').value = fieldTrip.payments[0].receipt.orNumber
            workSheet.getCell('J24').value = (fieldTrip.payments[0].isPaid) ? 'Paid' : 'Unpaid'
          }
        }
        var royalBall = student.fees.find((rf) => rf.name === 'Royal Ball')
        if (royalBall && royalBall.payments.length !== 0) {
          if (royalBall.payments[0].isPaid) {
            workSheet.getCell('A25').value = moment(royalBall.payments[0].datePaid).format('MM/DD/YYYY')
            workSheet.getCell('B25').value = (royalBall.payments[0].userId) ? `${royalBall.payments[0].userId.givenName} ${royalBall.payments[0].userId.lastName}` : ''
            workSheet.getCell('C25').value = royalBall.payments[0].receipt.orNumber
            workSheet.getCell('J25').value = (royalBall.payments[0].isPaid) ? 'Paid' : 'Unpaid'
          }
        }
        var supplies = student.fees.find((rf) => rf.name === 'Supplies - All Students')
        if (supplies && supplies.payments.length !== 0) {
          if (supplies.payments[0].isPaid) {
            workSheet.getCell('A26').value = moment(supplies.payments[0].datePaid).format('MM/DD/YYYY')
            workSheet.getCell('B26').value = (supplies.payments[0].userId) ? `${supplies.payments[0].userId.givenName} ${supplies.payments[0].userId.lastName}` : ''
            workSheet.getCell('C26').value = supplies.payments[0].receipt.orNumber
            workSheet.getCell('J26').value = (supplies.payments[0].isPaid) ? 'Paid' : 'Unpaid'
          }
        }
        var coat = student.fees.filter((rf) => rf.name.includes('Coat') || rf.name.includes('Textile'))
        var coatTotalAmount = 0
        var coatReceipts = []
        var coatUser = []
        var unpaidCoat = 0
        var paidCoat = 0
        coat.forEach((coatItem, coatIndex) => {
          if (coatItem.payments.length !== 0) {
            if (coatItem.payments[0].isPaid) {
              coatTotalAmount += coatItem.payments[0].amountDue
              coatReceipts.push(coatItem.payments[0].receipt.orNumber)
              coatUser.push((coatItem.payments[0].userId) ? `${coatItem.payments[0].userId.givenName} ${coatItem.payments[0].userId.lastName}` : '')
              paidCoat += 1
            } else {
              unpaidCoat += 1
            }
          }
        })
        if (coatTotalAmount !== 0) {
          workSheet.getCell('A27').value = ''
          workSheet.getCell('B27').value = coatUser
          workSheet.getCell('C27').value = coatReceipts
          workSheet.getCell('J27').value = `Paid: ${paidCoat}, Unpaid: ${unpaidCoat}`
        }
        var uniform = student.fees.filter((rf) => rf.name.includes('PE') || rf.name.includes('KVS'))
        var uniformTotalAmount = 0
        var uniformReceipts = []
        var uniformUser = []
        var unpaiduniform = 0
        var paiduniform = 0
        uniform.forEach((uniformItem, uniformIndex) => {
          if (uniformItem.payments.length !== 0) {
            if (uniformItem.payments[0].isPaid) {
              uniformTotalAmount += uniformItem.payments[0].amountDue
              uniformReceipts.push(uniformItem.payments[0].receipt.orNumber)
              uniformUser.push((uniformItem.payments[0].userId) ? `${uniformItem.payments[0].userId.givenName} ${uniformItem.payments[0].userId.lastName}` : '')
              paiduniform += 1
            } else {
              unpaiduniform += 1
            }
          }
        })
        if (uniformTotalAmount !== 0) {
          workSheet.getCell('A28').value = ''
          workSheet.getCell('B28').value = uniformUser
          workSheet.getCell('C28').value = uniformReceipts
          workSheet.getCell('J28').value = `Paid: ${paiduniform}, Unpaid: ${unpaiduniform}`
        }
        var pfCellNumber = (tlevelCode === '01' || tlevelCode === '06' || tlevelCode === '12') ? 23 : 24
        var parangalFee = student.fees.find((rf) => rf.name === 'Parangal Fee')
        if (parangalFee && parangalFee.payments.length !== 0) {
          if (parangalFee.payments[0].isPaid) {
            workSheet.getCell(`K${pfCellNumber}`).value = moment(parangalFee.payments[0].datePaid).format('MM/DD/YYYY')
            workSheet.getCell(`L${pfCellNumber}`).value = (parangalFee.payments[0].userId) ? `${parangalFee.payments[0].userId.givenName} ${parangalFee.payments[0].userId.lastName}` : ''
            workSheet.getCell(`M${pfCellNumber}`).value = parangalFee.payments[0].receipt.orNumber
            workSheet.getCell(`T${pfCellNumber}`).value = (parangalFee.payments[0].isPaid) ? 'Paid' : 'Unpaid'
          }
        }

        var yearBook = student.fees.find((rf) => rf.name === 'Annual Yearbook Graduating')
        if (yearBook && yearBook.payments.length !== 0) {
          if (yearBook.payments[0].isPaid) {
            workSheet.getCell('K25').value = moment(yearBook.payments[0].datePaid).format('MM/DD/YYYY')
            workSheet.getCell('L25').value = (yearBook.payments[0].userId) ? `${yearBook.payments[0].userId.givenName} ${yearBook.payments[0].userId.lastName}` : ''
            workSheet.getCell('M25').value = yearBook.payments[0].receipt.orNumber
            workSheet.getCell('T25').value = (yearBook.payments[0].isPaid) ? 'Paid' : 'Unpaid'
          }
        }

        var frameGradPic = student.fees.find((rf) => rf.name === 'Framed Grad Piture')
        if (frameGradPic && frameGradPic.payments.length !== 0) {
          if (frameGradPic.payments[0].isPaid) {
            workSheet.getCell('K26').value = moment(frameGradPic.payments[0].datePaid).format('MM/DD/YYYY')
            workSheet.getCell('L26').value = (frameGradPic.payments[0].userId) ? `${frameGradPic.payments[0].userId.givenName} ${frameGradPic.payments[0].userId.lastName}` : ''
            workSheet.getCell('M26').value = frameGradPic.payments[0].receipt.orNumber
            workSheet.getCell('T26').value = (frameGradPic.payments[0].isPaid) ? 'Paid' : 'Unpaid'
          }
        }

        var frameGradPicTheca = student.fees.find((rf) => rf.name === 'Framed Diploma, Theca, Framed Grad Picture')
        if (frameGradPicTheca && frameGradPicTheca.payments.length !== 0) {
          if (frameGradPicTheca.payments[0].isPaid) {
            workSheet.getCell('K27').value = moment(frameGradPicTheca.payments[0].datePaid).format('MM/DD/YYYY')
            workSheet.getCell('L27').value = (frameGradPicTheca.payments[0].userId) ? `${frameGradPicTheca.payments[0].userId.givenName} ${frameGradPicTheca.payments[0].userId.lastName}` : ''
            workSheet.getCell('M27').value = frameGradPicTheca.payments[0].receipt.orNumber
            workSheet.getCell('T27').value = (frameGradPicTheca.payments[0].isPaid) ? 'Paid' : 'Unpaid'
          }
        }

        workbook.xlsx.writeFile('storage/downloads/StatementOfAccount.xlsx').then(function () {
          res.download('storage/downloads/StatementOfAccount.xlsx', function (err) {
            console.log('---------- error downloading file: ' + err)
          })
        })
      })
  }
}
