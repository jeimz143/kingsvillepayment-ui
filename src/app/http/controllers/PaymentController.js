'use strict'

const Payment = require('../../../models/Payment')
const EnrollmentFee = require('../../../models/EnrollmentFees')
const Enrollment = require('../../../models/Enrollment')
const PaymentFee = require('../../../models/PaymentFees')
const Receipt = require('../../../models/Receipt')
const Fee = require('../../../models/Fee')
const Level = require('../../../models/Level')
// const { level } = require('winston')

const calculateTotal = (arr = []) => {
  var total = 0
  if (arr.length !== 0) {
    arr.forEach((arrItem, arrIndex) => {
      var theAmountDue = (arrItem.amountDue) ? arrItem.amountDue : 0
      total += parseFloat(theAmountDue)
    })
  }
  return total
}
module.exports = {
  async Index (req, res) {
    var socketio = req.app.get('socketio')
    await Payment.find({}, function (errPayment, response) {
      if (errPayment) {
        res.status(404).json({'error': 'not found', 'err': errPayment})
        throw errPayment
      } else {
        res.send({
          details: 'Payment Listed!'
        })
        socketio.emit('PaymentList', response)
      }
    })
  },
  async Picklist (req, res) {
    var query = (req.body.terms) ? {
      $and: [
        {
          $or: [{ 'code': { $regex: new RegExp(req.body.terms, 'i') } }, { 'name': { $regex: new RegExp(req.body.terms, 'i') } }]
        },
        {
          $or: [{ 'isMandatory': true }]
        }
      ]
    } : { 'isMandatory': false }
    await Payment.find(query).limit(10).exec(function (errPayment, response) {
      if (errPayment) {
        res.status(404).json({'error': 'not found', 'err': errPayment})
        throw errPayment
      } else {
        res.send(response)
      }
    })
  },
  async Store (req, res) {
    try {
      await Payment.Store(Payment, req.body, function (err, payments) {
        if (err) throw err
        if (payments) {
          res.send({
            details: 'stored!',
            id: payments._id
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
      await Payment.find({ fee: req.params.feeId }, function (err, payments) {
        if (err) {
          res.status(404).json({'error': 'not found', 'err': err})
          return
        }
        res.send(payments)
      })
    } catch (err) {
      console.log(err)
      res.status(400).send({
        error: 'Whoops! Something Went Wrong. Please Try Again'
      })
    }
  },
  async ShowMandatory (req, res) {
    try {
      await Payment.find({ isMandatory: true }, function (err, payments) {
        if (err) {
          res.status(404).json({'error': 'not found', 'err': err})
          return
        }
        res.send(payments)
      })
    } catch (err) {
      console.log(err)
      res.status(400).send({
        error: 'Whoops! Something Went Wrong. Please Try Again'
      })
    }
  },
  async Update (req, res) {
    try {
      await Payment.Update(req, function (err, payments) {
        if (err) throw err
        if (payments) {
          res.status(200).send({
            details: 'updated!'
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
      await Payment.Delete(Payment, req.body, function (err, payments) {
        if (err) throw err
        if (payments) {
          Payment.find({}, function (errPayment, response) {
            if (errPayment) {
              res.status(404).json({'error': 'not found', 'err': errPayment})
              throw err
            } else {
              res.send({
                details: 'Payment Deleted!'
              })
              socketio.emit('PaymentList', response)
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
  async GenerateReport (req, res) {
    res.setHeader('Content-disposition', 'attachment; filename=' + 'SummaryPayments.xlsx')
    res.setHeader('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')

    const Excel = require('exceljs')

    var workbook = new Excel.Workbook()

    workbook.xlsx.readFile(`${__dirname}/../../../database/data/SummaryPayments.xlsx`)
      .then(async function () {
        var levelCode = req.body.levelCode
        var schoolBranch = req.body.branch
        var schoolYearCode = req.body.schoolYearCode
        var workSheetNameList = [
          'PRESCHOOL',
          'PREKINDERGARTEN',
          'GRAD-KINDERGARTEN',
          'G1',
          'G2',
          'G3',
          'G4',
          'G5',
          'GRAD-G6',
          'G7',
          'G8',
          'G9',
          'G10',
          'G11',
          'GRAD-G12'
        ]
        var workSheet = workbook.getWorksheet('PRESCHOOL')
        if (levelCode === 'KG0000') {
          workSheet = workbook.getWorksheet('GRAD-KINDERGARTEN')
        } else if (levelCode === 'GRLVL0001') {
          workSheet = workbook.getWorksheet('G1')
        } else if (levelCode === 'GRLVL0002') {
          workSheet = workbook.getWorksheet('G2')
        } else if (levelCode === 'GRLVL0003') {
          workSheet = workbook.getWorksheet('G3')
        } else if (levelCode === 'GRLVL0004') {
          workSheet = workbook.getWorksheet('G4')
        } else if (levelCode === 'GRLVL0005') {
          workSheet = workbook.getWorksheet('G5')
        } else if (levelCode === 'GRLVL0006') {
          workSheet = workbook.getWorksheet('GRAD-G6')
        } else if (levelCode === 'GRLVL0007') {
          workSheet = workbook.getWorksheet('G7')
        } else if (levelCode === 'GRLVL0008') {
          workSheet = workbook.getWorksheet('G8')
        } else if (levelCode === 'GRLVL0009') {
          workSheet = workbook.getWorksheet('G9')
        } else if (levelCode === 'GRLVL0010') {
          workSheet = workbook.getWorksheet('G10')
        } else if (levelCode === 'GRLVL0011') {
          workSheet = workbook.getWorksheet('G11')
        } else if (levelCode === 'GRLVL0012') {
          workSheet = workbook.getWorksheet('GRAD-G12')
        }

        for (var i = 0; i < workSheetNameList.length; i++) {
          if (workSheetNameList[i] !== workSheet.name) {
            workbook.removeWorksheet(workSheetNameList[i])
          }
        }
        workSheet.columns.forEach((wsColumn, wsColumnIndex) => {
          if (wsColumnIndex >= 3) {
            wsColumn.width = 12
          }
        })

        var enrolledList = await Enrollment.find({ branch: schoolBranch, schoolYearCode: schoolYearCode, levelCode: levelCode }).populate([{
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

        var rowNumber = 8
        var grandTotal = 0
        var grandCollectibles = 0
        var reportList = []
        var amountDaysDueValue = 85
        enrolledList.forEach(async (listItem, listIndex) => {
          var enrollee = []

          var registrationFee = listItem.fees.find((rf) => rf.name === 'Registration Fees')
          var books = listItem.fees.find((rf) => rf.name === 'Books')
          var tuitionFee = listItem.fees.find((rf) => rf.name === 'Tuition Fees')
          var miscellanousFee = listItem.fees.find((rf) => rf.name === 'Miscellaneous Fees')
          var eventFee = listItem.fees.find((rf) => rf.name === 'Event Fee')
          var parangalFee = listItem.fees.find((rf) => rf.name === 'Parangal Fee')
          var fieldTrip = listItem.fees.find((rf) => rf.name === 'Field Trip')
          var royalBall = listItem.fees.find((rf) => rf.name === 'Royal Ball')
          var yearBook = listItem.fees.find((rf) => rf.name === 'Annual Yearbook Graduating')
          var framedGradPicture = listItem.fees.find((rf) => rf.name === 'Framed Grad Piture')
          var diploma = listItem.fees.find((rf) => rf.name === 'Framed Diploma, Theca, Framed Grad Picture')
          var supplies = listItem.fees.find((rf) => rf.name === 'Supplies - All Students')
          var pins = listItem.fees.filter((rf) => rf.name === 'Pin')
          var nameplates = listItem.fees.filter((rf) => rf.name === 'Nameplate')
          var uniforms = listItem.fees.filter((rf) => rf.name === 'Uniform')
          var vans = listItem.fees.filter((rf) => rf.name === 'Van')

          // Student Information
          enrollee.push(listIndex + 1)
          enrollee.push(listItem.studentNumber)
          enrollee.push(listItem.studentName)

          // Mandatory Fees
          enrollee.push(parseFloat(registrationFee.amount.toFixed(2)))
          enrollee.push(parseFloat(books.amount.toFixed(2)))
          enrollee.push(parseFloat(tuitionFee.discount.toFixed(2)))

          // Tuition Fees Plus Misc.
          var tuitionPlusMiscFee = 0
          var amountDuePerMonth = 0
          tuitionFee.payments.forEach((tfpItem, tfpIndex) => {
            tuitionPlusMiscFee = tfpItem.amountToPayPerMonth + miscellanousFee.payments[tfpIndex].amountToPayPerMonth
            amountDuePerMonth = (tfpItem.numberOfDaysDue * amountDaysDueValue) + (miscellanousFee.payments[tfpIndex].numberOfDaysDue * amountDaysDueValue)
            enrollee.push(parseFloat(tuitionPlusMiscFee.toFixed(2)))
            enrollee.push(parseFloat(amountDuePerMonth.toFixed(2)))
          })
          // validate if enrollment is for Cash Basis
          if (listItem.paymentTerm === 1) {
            for (var noOfNoValues = 18; noOfNoValues > 0; noOfNoValues--) {
              enrollee.push(0.00)
            }
          }

          // Other Item Fees
          if (eventFee) {
            enrollee.push(parseFloat(eventFee.amount.toFixed(2)))
          } else { enrollee.push(0.00) }

          if (supplies) {
            enrollee.push(parseFloat(supplies.amount.toFixed(2)))
          } else { enrollee.push(0.00) }

          if (fieldTrip) {
            enrollee.push(parseFloat(fieldTrip.amount.toFixed(2)))
          } else { enrollee.push(0.00) }

          if (royalBall) {
            enrollee.push(parseFloat(royalBall.amount.toFixed(2)))
          } else { enrollee.push(0.00) }

          if (parangalFee) {
            enrollee.push(parseFloat(parangalFee.amount.toFixed(2)))
          } else { enrollee.push(0.00) }

          if (yearBook) {
            enrollee.push(parseFloat(yearBook.amount.toFixed(2)))
          } else { enrollee.push(0.00) }

          if (framedGradPicture) {
            enrollee.push(parseFloat(framedGradPicture.amount.toFixed(2)))
          } else { enrollee.push(0.00) }

          if (diploma) {
            enrollee.push(parseFloat(diploma.amount.toFixed(2)))
          } else { enrollee.push(0.00) }

          if (pins.length !== 0) {
            var pin = 0
            pins.forEach((i) => {
              pin += i.amount
            })
            enrollee.push(parseFloat(pin.toFixed(2)))
          } else { enrollee.push(0.00) }

          if (nameplates.length !== 0) {
            var nameplate = 0
            nameplates.forEach((i) => {
              nameplate += i.amount
            })
            enrollee.push(parseFloat(nameplate.toFixed(2)))
          } else { enrollee.push(0.00) }

          if (uniforms.length !== 0) {
            var uniform = 0
            uniforms.forEach((i) => {
              uniform += i.amount
            })
            enrollee.push(parseFloat(uniform.toFixed(2)))
          } else { enrollee.push(0.00) }

          if (vans.length !== 0) {
            var van = 0
            vans.forEach((i) => {
              van += i.amount
            })
            enrollee.push(parseFloat(van.toFixed(2)))
          } else { enrollee.push(0.00) }

          var totalAmount = 0

          for (var enrolleeIndex = 3; enrolleeIndex <= enrollee.length; enrolleeIndex++) {
            totalAmount += enrollee[enrolleeIndex]
          }

          enrollee.push(totalAmount)

          workSheet.spliceRows(rowNumber, 1, enrollee, [])
          rowNumber += 1
        })

        rowNumber += 1
        workSheet.spliceRows(rowNumber, 1, [ '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', parseFloat(grandTotal).toFixed(2), parseFloat(grandCollectibles).toFixed(2), '', '' ])
        workbook.xlsx.writeFile('storage/downloads/SummaryPayments.xlsx').then(function () {
          res.download('storage/downloads/SummaryPayments.xlsx', function (err) {
            console.log('---------- error downloading file: ' + err)
          })
        })
      })
  },
  async GenerateReportX (req, res) {
    res.setHeader('Content-disposition', 'attachment; filename=' + 'SummaryPayments.xlsx')
    res.setHeader('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')

    const Excel = require('exceljs')

    var workbook = new Excel.Workbook()
    // workbook.xlsx.readFile('storage/downloads/SummaryPayments.xlsx')
    workbook.xlsx.readFile(`${__dirname}/../../../database/data/SummaryPayments.xlsx`)
      .then(async function () {
        var levelCode = req.body.levelCode
        var schoolBranch = req.body.branch
        var schoolYearCode = req.body.schoolYearCode
        var workSheetNameList = [
          'PRESCHOOL',
          'PREKINDERGARTEN',
          'GRAD-KINDERGARTEN',
          'G1',
          'G2',
          'G3',
          'G4',
          'G5',
          'GRAD-G6',
          'G7',
          'G8',
          'G9',
          'G10',
          'G11',
          'GRAD-G12'
        ]
        var workSheet = workbook.getWorksheet('PRESCHOOL')
        if (levelCode === 'KG0000') {
          workSheet = workbook.getWorksheet('GRAD-KINDERGARTEN')
        } else if (levelCode === 'GRLVL0001') {
          workSheet = workbook.getWorksheet('G1')
        } else if (levelCode === 'GRLVL0002') {
          workSheet = workbook.getWorksheet('G2')
        } else if (levelCode === 'GRLVL0003') {
          workSheet = workbook.getWorksheet('G3')
        } else if (levelCode === 'GRLVL0004') {
          workSheet = workbook.getWorksheet('G4')
        } else if (levelCode === 'GRLVL0005') {
          workSheet = workbook.getWorksheet('G5')
        } else if (levelCode === 'GRLVL0006') {
          workSheet = workbook.getWorksheet('GRAD-G6')
        } else if (levelCode === 'GRLVL0007') {
          workSheet = workbook.getWorksheet('G7')
        } else if (levelCode === 'GRLVL0008') {
          workSheet = workbook.getWorksheet('G8')
        } else if (levelCode === 'GRLVL0009') {
          workSheet = workbook.getWorksheet('G9')
        } else if (levelCode === 'GRLVL0010') {
          workSheet = workbook.getWorksheet('G10')
        } else if (levelCode === 'GRLVL0011') {
          workSheet = workbook.getWorksheet('G11')
        } else if (levelCode === 'GRLVL0012') {
          workSheet = workbook.getWorksheet('GRAD-G12')
        }

        for (var i = 0; i < workSheetNameList.length; i++) {
          if (workSheetNameList[i] !== workSheet.name) {
            workbook.removeWorksheet(workSheetNameList[i])
          }
        }
        workSheet.columns.forEach((wsColumn, wsColumnIndex) => {
          if (wsColumnIndex >= 3) {
            wsColumn.width = 12
          }
        })
        var subHeader = ['', '', '', 1500, 4850, 0]
        var levelCodeItem = await Level.findOne({ branch: schoolBranch, code: levelCode }).exec()
        var feeToFind = []
        for (i = 4; i <= 14; i++) {
          feeToFind.push({ code: `KV11001${i}` })
        }
        var FeeItem = await Fee.find({ $and: [{ branch: schoolBranch }, { $or: feeToFind }] }).exec()
        var levelCodeQuotient = levelCodeItem.unitPrice / 10
        for (i = 1; i <= 10; i++) {
          subHeader.push(levelCodeQuotient)
          subHeader.push(0)
        }
        FeeItem.forEach((feeItem, feeItemIndex) => {
          if (feeItemIndex === (FeeItem.length - 1)) {
            subHeader.push(0)
          }
          subHeader.push(feeItem.unitPrice)
        })
        var subHeaderTotal = 0
        subHeader.forEach((headerItem, headerItemIndex) => {
          if (headerItemIndex >= 3 && headerItemIndex <= 38) {
            subHeaderTotal += headerItem
          }
        })
        var schoolYearHeader = workSheet.getCell('A4')
        schoolYearHeader.value = `STATEMENT OF ACCOUNT (PAYMENTS) S.Y. ${schoolYearCode}`
        schoolYearHeader.font = {
          bold: true,
          size: 14
        }
        schoolYearHeader.alignment = {
          vertical: 'middle',
          horizontal: 'center'
        }
        subHeader.push(subHeaderTotal)
        subHeader.push(0)
        workSheet.spliceRows(7, 1, subHeader)
        var rowSeven = workSheet.getRow(7)
        rowSeven.eachCell(function (cell, colNumber) {
          rowSeven.getCell(colNumber).numFmt = '0.00'
          rowSeven.getCell(colNumber).font = {
            color: {argb: '991111'},
            bold: true
          }
        })
        var enrolledList = await Enrollment.find({ branch: schoolBranch, schoolYearCode: schoolYearCode, levelCode: levelCode }).populate([{
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
        var rowNumber = 8
        var grandTotal = 0
        var grandCollectibles = 0
        var enrolledPaymentList = []
        enrolledList.forEach(async (listItem, listIndex) => {
          var enrolledKGRow = null
          if (listItem.fees.length !== 0) {
            var registrationFee = listItem.fees.find((rf) => rf.name === 'Registration Fees')
            var books = listItem.fees.find((rf) => rf.name === 'Books')
            var tuitionFee = listItem.fees.find((rf) => rf.name === 'Tuition Fees')
            var miscellanousFee = listItem.fees.find((rf) => rf.name === 'Miscellaneous Fees')
            enrolledKGRow = [
              listIndex + 1,
              listItem.studentNumber,
              listItem.studentName,
              (registrationFee.isPaid) ? parseFloat(registrationFee.amount.toFixed(2)) : 0,
              (books.isPaid) ? parseFloat(books.amount.toFixed(2)) : 0,
              (tuitionFee) ? parseFloat(tuitionFee.discount.toFixed(2)) : 0
            ]
            var totalPaid = parseFloat(enrolledKGRow[3]) + parseFloat(enrolledKGRow[4])
            var noOfNoValueCell = 20
            if (tuitionFee.payments.length !== 0 && miscellanousFee.payments.length !== 0) {
              tuitionFee.payments.forEach((paymentItem, paymentIndex) => {
                if (paymentItem.isPaid && miscellanousFee.payments[paymentIndex].isPaid) {
                  enrolledKGRow.push((paymentItem.amountToPayPerMonth) ? parseFloat(paymentItem.amountToPayPerMonth.toFixed(2)) + parseFloat(miscellanousFee.payments[paymentIndex].amountToPayPerMonth.toFixed(2)) : 0)
                  enrolledKGRow.push((paymentItem.numberOfDaysDue) ? parseFloat((paymentItem.numberOfDaysDue * 85)) + parseFloat((miscellanousFee.payments[paymentIndex].numberOfDaysDue * 85)) : 0)
                  totalPaid += parseFloat(paymentItem.amountToPayPerMonth)
                  totalPaid += parseFloat((paymentItem.numberOfDaysDue * 85))
                  totalPaid += parseFloat(miscellanousFee.payments[paymentIndex].amountToPayPerMonth)
                  totalPaid += parseFloat((miscellanousFee.payments[paymentIndex].numberOfDaysDue * 85))
                  noOfNoValueCell -= 2
                }
              })
            } else {
              enrolledKGRow.push(0)
              enrolledKGRow.push(0)
              noOfNoValueCell -= 2
            }
            for (i = 0; i < noOfNoValueCell; i++) {
              enrolledKGRow.push(0)
            }
            FeeItem.forEach((feeItem, feeItemIndex) => {
              var enrollmentFee = listItem.fees.find(f => f.code === feeItem.code)
              if (enrollmentFee && enrollmentFee.isPaid) {
                enrolledKGRow.push(parseFloat(enrollmentFee.payments[0].amountToPayPerMonth.toFixed(2)))
                totalPaid += parseFloat(enrollmentFee.payments[0].amountToPayPerMonth)
              } else {
                enrolledKGRow.push(0)
              }
              if (feeItemIndex === (FeeItem.length - 1)) {
                enrolledKGRow.push(0)
              }
            })
            enrolledKGRow.push(totalPaid)
            console.log(enrolledKGRow)
            var totalAmountToPay = 0
            listItem.fees.forEach((feeItem) => {
              totalAmountToPay += parseFloat(feeItem.amount)
            })
            var collectibles = 0
            for (var y = 3; y <= 38; y++) {
              collectibles = collectibles + enrolledKGRow[y]
            }
            collectibles = totalAmountToPay - collectibles
            enrolledKGRow.push(parseFloat(collectibles.toFixed(2)))
            var numberOfPaidPayment = tuitionFee.payments.filter((p) => p.isPaid === true).length
            if (numberOfPaidPayment === 0) {
              enrolledKGRow.push('Unpaid')
            } else if (numberOfPaidPayment === tuitionFee.payments.length) {
              enrolledKGRow.push('Paid')
            } else if (numberOfPaidPayment < tuitionFee.payments.length) {
              enrolledKGRow.push('Partially Paid')
            }
            enrolledKGRow.push('')
          } else {
            totalAmountToPay = 0
            listItem.fees.forEach((feeItem) => {
              totalAmountToPay += parseFloat(feeItem.amount)
            })
            enrolledKGRow = [ listIndex + 1, listItem.studentNumber, listItem.studentName, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, totalAmountToPay, 'Unpaid', '' ]
          }
          grandTotal += enrolledKGRow[38]
          grandCollectibles += enrolledKGRow[39]
          enrolledPaymentList.push(enrolledKGRow)
          workSheet.spliceRows(rowNumber, 1, enrolledKGRow, [])
          var theRowOnProcess = workSheet.getRow(rowNumber)
          theRowOnProcess.eachCell(function (cell, colNumber) {
            // console.log(cell)
            var cellValue = theRowOnProcess.getCell(colNumber).value
            theRowOnProcess.getCell(colNumber).border = {
              top: {style: 'thin'},
              left: {style: 'thin'},
              bottom: {style: 'thin'},
              right: {style: 'thin'}
            }
            if (colNumber >= 4 && colNumber <= 39) {
              theRowOnProcess.getCell(colNumber).font = {
                color: {argb: 'ffffff'}
              }
              // something
              if (cellValue === 0 || colNumber === 6) {
                theRowOnProcess.getCell(colNumber).fill = {
                  type: 'pattern',
                  pattern: 'solid',
                  fgColor: { argb: '680f11' }
                }
              } else {
                theRowOnProcess.getCell(colNumber).fill = {
                  type: 'pattern',
                  pattern: 'solid',
                  fgColor: { argb: '4caf50' }
                }
              }
            }
            if (colNumber === 41) {
              if (cellValue === 'Unpaid') {
                theRowOnProcess.getCell(colNumber).fill = {
                  type: 'pattern',
                  pattern: 'solid',
                  fgColor: { argb: '680f11' }
                }
              } else if (cellValue === 'Paid') {
                theRowOnProcess.getCell(colNumber).fill = {
                  type: 'pattern',
                  pattern: 'solid',
                  fgColor: { argb: '4caf50' }
                }
              } else if (cellValue === 'Partially Paid') {
                theRowOnProcess.getCell(colNumber).fill = {
                  type: 'pattern',
                  pattern: 'solid',
                  fgColor: { argb: 'ffc107' }
                }
              }
            }
          })
          rowNumber += 1
        })
        rowNumber += 1
        workSheet.spliceRows(rowNumber, 1, [ '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', parseFloat(grandTotal).toFixed(2), parseFloat(grandCollectibles).toFixed(2), '', '' ])
        workbook.xlsx.writeFile('storage/downloads/SummaryPayments.xlsx').then(function () {
          res.download('storage/downloads/SummaryPayments.xlsx', function (err) {
            console.log('---------- error downloading file: ' + err)
          })
        })
      })
  },
  async GenerateDailyReport (req, res) {
    res.setHeader('Content-disposition', 'attachment; filename=' + 'Payments.xlsx')
    res.setHeader('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    try {
      var moment = require('moment')
      // const theDate = new Date(parseInt(fromDate.format('YYYY')), parseInt(fromDate.format('MM')), parseInt(fromDate.format('DD')))
      const fromDate = new Date(moment(req.body.fromDate))
      const toDate = new Date(moment(req.body.toDate))
      await PaymentFee.find({
        'branch': req.body.branch,
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
      ]).exec(function (err, paymentFee) {
        if (err) {
          res.status(404).json({'error': 'not found', 'err': err})
          return
        }
        const ExcelJS = require('exceljs')
        var workbook = new ExcelJS.Workbook()

        // Payment Work Sheet
        var PaymentWorkSheet = workbook.addWorksheet('Payments')
        PaymentWorkSheet.columns = [
          { header: 'Date Paid', key: 'datePaid', width: 12 },
          { header: 'Student Number', key: 'studentNumber', width: 20 },
          { header: 'Student Name', key: 'studentName', width: 30 },
          { header: 'Grade Level', key: 'levelCode', width: 12 },
          { header: 'Code Fee', key: 'codeFee', width: 12 },
          { header: 'Particular', key: 'particular', width: 35 },
          { header: 'Payment Terms', key: 'paymentTerm', width: 12 },
          { header: 'Quantity', key: 'quantity', width: 12 },
          { header: 'Unit Price', key: 'unitPrice', width: 12 },
          { header: 'Discount (%)', key: 'discount', width: 11 },
          { header: 'Amount', key: 'amount', width: 14 },
          { header: 'Amount To Pay', key: 'amountToPay', width: 14 },
          { header: 'Amount Due', key: 'amountDue', width: 14 },
          { header: 'Cash Tendered', key: 'cashTendered', width: 14 },
          { header: 'Cash Change', key: 'cashChange', width: 14 },
          { header: 'Payment Remarks', key: 'paymentRemarks', width: 40 },
          { header: 'Remarks', key: 'remarks', width: 42 }
        ]
        PaymentWorkSheet.getRow(1).fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '1877F2' }
        }
        PaymentWorkSheet.eachRow(function (row, rowNumber) {
          row.eachCell(function (cell, colNumber) {
            row.getCell(colNumber).font = { color: { argb: 'ffffff' }, 'bold': true }
          })
        })
        var amountPerFee = {}
        var overAllAmount = 0
        paymentFee.forEach((paymentItem, paymentIndex) => {
          var pEnrollmentFee = paymentItem.enrollmentFee
          var pEnrollment = pEnrollmentFee.enrollment
          PaymentWorkSheet.addRow({
            datePaid: paymentItem.datePaid,
            studentNumber: pEnrollment.studentNumber,
            studentName: pEnrollment.studentName,
            levelCode: pEnrollment.levelCode,
            codeFee: pEnrollmentFee.code,
            particular: pEnrollmentFee.name,
            paymentTerm: (pEnrollmentFee.paymentTerm === 1) ? 'In-Cash' : 'Monthly Base',
            quantity: (pEnrollmentFee.type === 0) ? 'N/A' : parseFloat(pEnrollmentFee.quantity).toFixed(2),
            unitPrice: pEnrollmentFee.unitPrice,
            discount: parseFloat(pEnrollmentFee.discount).toFixed(2),
            amount: parseFloat(pEnrollmentFee.amount).toFixed(2),
            amountToPay: parseFloat(paymentItem.amountToPayPerMonth).toFixed(2),
            amountDue: parseFloat(paymentItem.amountDue).toFixed(2),
            cashTendered: parseFloat(paymentItem.cashTendered).toFixed(2),
            cashChange: (paymentItem.cashChange < 0) ? 0 : parseFloat(paymentItem.cashChange).toFixed(2),
            paymentRemarks: paymentItem.remarks,
            remarks: pEnrollmentFee.remarks
          })
          if (!amountPerFee[`${pEnrollmentFee.code}`]) {
            amountPerFee[`${pEnrollmentFee.code}`] = 0
            amountPerFee[`${pEnrollmentFee.code}`] = parseFloat(amountPerFee[`${pEnrollmentFee.code}`] + paymentItem.amountDue).toFixed(2)
          } else {
            amountPerFee[`${pEnrollmentFee.code}`] = parseFloat(amountPerFee[`${pEnrollmentFee.code}`] + paymentItem.amountDue).toFixed(2)
          }
          // overAllAmount = overAllAmount + paymentItem.amountDue
        })
        // Summary Work Sheet
        Level.find({}).exec((err, Levels) => {
          if (err) throw err
          var SummaryWorkSheet = workbook.addWorksheet('Summary')
          var noOfRows = 0
          SummaryWorkSheet.mergeCells('A1', 'D1')
          SummaryWorkSheet.getCell('A1').value = 'Kingsville Advanced School System'
          SummaryWorkSheet.getCell('A1').font = { color: { argb: '000000' }, 'bold': true }
          SummaryWorkSheet.getCell('A2').value = 'Daily Income'
          SummaryWorkSheet.getCell('A2').font = { color: { argb: '000000' }, 'bold': true }
          SummaryWorkSheet.getCell('A3').value = 'Date(MM/DD/YYYY)'
          SummaryWorkSheet.getCell('A3').font = { color: { argb: '000000' }, 'bold': true }
          SummaryWorkSheet.getCell('B3').value = `${moment(req.body.fromDate).format('MM/DD/YYYY')}`
          SummaryWorkSheet.getRow(6).values = ['Grade Level', 'Books', 'Registration Fees', 'Tuition Fees', 'Miscellaneous Fees', 'Other Fees', 'Total']
          SummaryWorkSheet.columns = [
            { key: 'code' },
            { key: 'books' },
            { key: 'regisrationFees' },
            { key: 'tuitionFees' },
            { key: 'miscellaneousFees' },
            { key: 'otherFees' },
            { key: 'total' }

          ]
          SummaryWorkSheet.eachRow(function (row, rowNumber) {
            if (rowNumber === 6) {
              row.eachCell(function (cell, colNumber) {
                row.getCell(colNumber).fill = {
                  type: 'pattern',
                  pattern: 'solid',
                  fgColor: { argb: 'FF5E00' }
                }
                row.getCell(colNumber).font = { color: { argb: 'ffffff' }, 'bold': true }
              })
            }
          })
          Levels.forEach(async (levelItem, levelIndex) => {
            var registrationFee = paymentFee.filter((rf) =>
              rf.enrollmentFee.name === 'Registration Fees' &&
              rf.enrollmentFee.enrollment.levelCode === levelItem.code &&
              rf.isPaid)
            var books = paymentFee.filter((rf) =>
              rf.enrollmentFee.name === 'Books' &&
              rf.enrollmentFee.enrollment.levelCode === levelItem.code &&
              rf.isPaid)
            var tuitionFee = paymentFee.filter((rf) =>
              rf.enrollmentFee.name === 'Tuition Fees' &&
              rf.enrollmentFee.enrollment.levelCode === levelItem.code &&
              rf.isPaid)
            var miscellanousFee = paymentFee.filter((rf) =>
              rf.enrollmentFee.name === 'Miscellaneous Fees' &&
              rf.enrollmentFee.enrollment.levelCode === levelItem.code &&
              rf.isPaid)
            var otherFees = paymentFee.filter((rf) =>
              (rf.enrollmentFee.name !== 'Miscellaneous Fees' && rf.enrollmentFee.name !== 'Tuition Fees' && rf.enrollmentFee.name !== 'Books' && rf.enrollmentFee.name !== 'Registration Fees') &&
              rf.enrollmentFee.enrollment.levelCode === levelItem.code &&
              rf.isPaid)
            var summaryRow = {
              code: levelItem.code,
              books: calculateTotal(books),
              regisrationFees: calculateTotal(registrationFee),
              tuitionFees: calculateTotal(tuitionFee),
              miscellaneousFees: calculateTotal(miscellanousFee),
              otherFees: calculateTotal(otherFees),
              total: calculateTotal(books) + calculateTotal(registrationFee) + calculateTotal(tuitionFee) + calculateTotal(miscellanousFee) + calculateTotal(otherFees)
            }
            overAllAmount += summaryRow.total
            SummaryWorkSheet.addRow(summaryRow)
            noOfRows++
          })
          SummaryWorkSheet.addRow({
            otherFees: 'Over all Amount',
            total: parseFloat(overAllAmount).toFixed(2)
          })
          var summaryLastRow = SummaryWorkSheet.lastRow
          summaryLastRow.getCell(6).font = { 'bold': true }
          var borderStyles = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
          }
          SummaryWorkSheet.eachRow({}, function (row, rowNumber) {
            if (rowNumber >= 5) {
              row.eachCell({ includeEmpty: true }, function (cell, colNumber) {
                if (!cell.value && noOfRows !== rowNumber) {
                  cell.value = 0
                }
                cell.border = borderStyles
              })
            }
          })
          workbook.xlsx.writeFile('storage/downloads/DailyPayments.xlsx')
            .then(function () {
              res.download('storage/downloads/DailyPayments.xlsx', function (err) {
                console.log('---------- error downloading file: ' + err)
              })
            })
        })
      })
    } catch (err) {
      console.log(err)
      res.status(400).send({
        error: 'Whoops! Something Went Wrong. Please Try Again'
      })
    }
  },
  async GenerateMonthlyReport (req, res) {
    res.setHeader('Content-disposition', 'attachment; filename=' + 'Payments.xlsx')
    res.setHeader('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    try {
      var moment = require('moment')
      // const theDate = new Date(parseInt(fromDate.format('YYYY')), parseInt(fromDate.format('MM')), parseInt(fromDate.format('DD')))
      const fromDate = new Date(moment(req.body.fromDate))
      const toDate = new Date(moment(req.body.toDate))
      await PaymentFee.find({
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
      ]).exec(function (err, paymentFee) {
        if (err) {
          res.status(404).json({'error': 'not found', 'err': err})
          return
        }
        const ExcelJS = require('exceljs')
        var workbook = new ExcelJS.Workbook()

        // Payment Work Sheet
        var PaymentWorkSheet = workbook.addWorksheet('Payments')
        PaymentWorkSheet.columns = [
          { header: 'Date Paid', key: 'datePaid', width: 12 },
          { header: 'Student Number', key: 'studentNumber', width: 20 },
          { header: 'Student Name', key: 'studentName', width: 30 },
          { header: 'Grade Level', key: 'levelCode', width: 12 },
          { header: 'Code Fee', key: 'codeFee', width: 12 },
          { header: 'Particular', key: 'particular', width: 35 },
          { header: 'Payment Terms', key: 'paymentTerm', width: 12 },
          { header: 'Quantity', key: 'quantity', width: 12 },
          { header: 'Unit Price', key: 'unitPrice', width: 12 },
          { header: 'Discount (%)', key: 'discount', width: 11 },
          { header: 'Amount', key: 'amount', width: 14 },
          { header: 'Amount To Pay', key: 'amountToPay', width: 14 },
          { header: 'Amount Due', key: 'amountDue', width: 14 },
          { header: 'Cash Tendered', key: 'cashTendered', width: 14 },
          { header: 'Cash Change', key: 'cashChange', width: 14 },
          { header: 'Payment Remarks', key: 'paymentRemarks', width: 40 },
          { header: 'Remarks', key: 'remarks', width: 42 }
        ]
        PaymentWorkSheet.getRow(1).fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '1877F2' }
        }
        PaymentWorkSheet.eachRow(function (row, rowNumber) {
          row.eachCell(function (cell, colNumber) {
            row.getCell(colNumber).font = { color: { argb: 'ffffff' }, 'bold': true }
          })
        })
        var amountPerFee = {}
        var overAllAmount = 0
        paymentFee.forEach((paymentItem, paymentIndex) => {
          var pEnrollmentFee = paymentItem.enrollmentFee
          var pEnrollment = pEnrollmentFee.enrollment
          PaymentWorkSheet.addRow({
            datePaid: paymentItem.datePaid,
            studentNumber: pEnrollment.studentNumber,
            studentName: pEnrollment.studentName,
            levelCode: pEnrollment.levelCode,
            codeFee: pEnrollmentFee.code,
            particular: pEnrollmentFee.name,
            paymentTerm: (pEnrollmentFee.paymentTerm === 1) ? 'In-Cash' : 'Monthly Base',
            quantity: (pEnrollmentFee.type === 0) ? 'N/A' : parseFloat(pEnrollmentFee.quantity).toFixed(2),
            unitPrice: pEnrollmentFee.unitPrice,
            discount: parseFloat(pEnrollmentFee.discount).toFixed(2),
            amount: parseFloat(pEnrollmentFee.amount).toFixed(2),
            amountToPay: parseFloat(paymentItem.amountToPayPerMonth).toFixed(2),
            amountDue: parseFloat(paymentItem.amountDue).toFixed(2),
            cashTendered: parseFloat(paymentItem.cashTendered).toFixed(2),
            cashChange: (paymentItem.cashChange < 0) ? 0 : parseFloat(paymentItem.cashChange).toFixed(2),
            paymentRemarks: paymentItem.remarks,
            remarks: pEnrollmentFee.remarks
          })
          if (!amountPerFee[`${pEnrollmentFee.code}`]) {
            amountPerFee[`${pEnrollmentFee.code}`] = 0
            amountPerFee[`${pEnrollmentFee.code}`] = parseFloat(amountPerFee[`${pEnrollmentFee.code}`] + paymentItem.amountDue).toFixed(2)
          } else {
            amountPerFee[`${pEnrollmentFee.code}`] = parseFloat(amountPerFee[`${pEnrollmentFee.code}`] + paymentItem.amountDue).toFixed(2)
          }
          // overAllAmount = overAllAmount + paymentItem.amountDue
        })
        // Summary Work Sheet
        Level.find({}).exec((err, Levels) => {
          if (err) throw err
          var SummaryWorkSheet = workbook.addWorksheet('Summary')
          var noOfRows = 0
          SummaryWorkSheet.mergeCells('A1', 'D1')
          SummaryWorkSheet.getCell('A1').value = 'Kingsville Advanced School System'
          SummaryWorkSheet.getCell('A1').font = { color: { argb: '000000' }, 'bold': true }
          SummaryWorkSheet.getCell('A2').value = 'Daily Income'
          SummaryWorkSheet.getCell('A2').font = { color: { argb: '000000' }, 'bold': true }
          SummaryWorkSheet.getCell('A3').value = 'Date(MM/DD/YYYY)'
          SummaryWorkSheet.getCell('A3').font = { color: { argb: '000000' }, 'bold': true }
          SummaryWorkSheet.getCell('B3').value = `${moment(req.body.fromDate).format('MM/DD/YYYY')}`
          SummaryWorkSheet.getRow(6).values = ['Grade Level', 'Books', 'Registration Fees', 'Tuition Fees', 'Miscellaneous Fees', 'Other Fees', 'Total']
          SummaryWorkSheet.columns = [
            { key: 'code' },
            { key: 'books' },
            { key: 'regisrationFees' },
            { key: 'tuitionFees' },
            { key: 'miscellaneousFees' },
            { key: 'otherFees' },
            { key: 'total' }

          ]
          SummaryWorkSheet.eachRow(function (row, rowNumber) {
            if (rowNumber === 6) {
              row.eachCell(function (cell, colNumber) {
                row.getCell(colNumber).fill = {
                  type: 'pattern',
                  pattern: 'solid',
                  fgColor: { argb: 'FF5E00' }
                }
                row.getCell(colNumber).font = { color: { argb: 'ffffff' }, 'bold': true }
              })
            }
          })
          Levels.forEach(async (levelItem, levelIndex) => {
            var registrationFee = paymentFee.filter((rf) =>
              rf.enrollmentFee.name === 'Registration Fees' &&
              rf.enrollmentFee.enrollment.levelCode === levelItem.code &&
              rf.isPaid)
            var books = paymentFee.filter((rf) =>
              rf.enrollmentFee.name === 'Books' &&
              rf.enrollmentFee.enrollment.levelCode === levelItem.code &&
              rf.isPaid)
            var tuitionFee = paymentFee.filter((rf) =>
              rf.enrollmentFee.name === 'Tuition Fees' &&
              rf.enrollmentFee.enrollment.levelCode === levelItem.code &&
              rf.isPaid)
            var miscellanousFee = paymentFee.filter((rf) =>
              rf.enrollmentFee.name === 'Miscellaneous Fees' &&
              rf.enrollmentFee.enrollment.levelCode === levelItem.code &&
              rf.isPaid)
            var otherFees = paymentFee.filter((rf) =>
              (rf.enrollmentFee.name !== 'Miscellaneous Fees' && rf.enrollmentFee.name !== 'Tuition Fees' && rf.enrollmentFee.name !== 'Books' && rf.enrollmentFee.name !== 'Registration Fees') &&
              rf.enrollmentFee.enrollment.levelCode === levelItem.code &&
              rf.isPaid)
            var summaryRow = {
              code: levelItem.code,
              books: calculateTotal(books),
              regisrationFees: calculateTotal(registrationFee),
              tuitionFees: calculateTotal(tuitionFee),
              miscellaneousFees: calculateTotal(miscellanousFee),
              otherFees: calculateTotal(otherFees),
              total: calculateTotal(books) + calculateTotal(registrationFee) + calculateTotal(tuitionFee) + calculateTotal(miscellanousFee) + calculateTotal(otherFees)
            }
            overAllAmount += summaryRow.total
            SummaryWorkSheet.addRow(summaryRow)
            noOfRows++
          })
          SummaryWorkSheet.addRow({
            otherFees: 'Over all Amount',
            total: parseFloat(overAllAmount).toFixed(2)
          })
          var summaryLastRow = SummaryWorkSheet.lastRow
          summaryLastRow.getCell(6).font = { 'bold': true }
          var borderStyles = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
          }
          SummaryWorkSheet.eachRow({}, function (row, rowNumber) {
            if (rowNumber >= 5) {
              row.eachCell({ includeEmpty: true }, function (cell, colNumber) {
                if (!cell.value && noOfRows !== rowNumber) {
                  cell.value = 0
                }
                cell.border = borderStyles
              })
            }
          })
          workbook.xlsx.writeFile('storage/downloads/MonthlyPayments.xlsx')
            .then(function () {
              res.download('storage/downloads/MonthlyPayments.xlsx', function (err) {
                console.log('---------- error downloading file: ' + err)
              })
            })
        })
      })
    } catch (err) {
      console.log(err)
      res.status(400).send({
        error: 'Whoops! Something Went Wrong. Please Try Again'
      })
    }
  },
  async AssignReceipt (req, res) {
    var numberOfUnusedReceipt = await Receipt.find({ 'status': 0 }).countDocuments()
    if (numberOfUnusedReceipt > 0) {
      await Receipt.findOneAndUpdate({ 'status': 0 },
        { $set: { 'paymentFee': req.body._id, 'status': 1 } },
        {}).exec(async function (err, receipt) {
        if (err) {
          res.status(404).json({'error': 'not found', 'err': err})
          return
        }
        await PaymentFee.update({ '_id': req.body._id },
          { $set: { 'receipt': receipt._id } },
          {}).exec(async function (err, payment) {
          if (err) {
            res.status(404).json({'error': 'not found', 'err': err})
            return
          }
          res.status(200).send({
            details: 'updated!'
          })
        })
        console.log('done Assigning')
      })
    } else {
      res.status(200).send({
        error: 'No more available receipts. Please Contact your administrator to upload more'
      })
    }
  },
  async CancelReceipt (req, res) {
    var thePayment = req.body.payment
    await Receipt.findOneAndUpdate({ 'orNumber': thePayment.receipt.orNumber },
      { $set: { 'paymentFee': thePayment._id, 'status': 2 } },
      {}).exec(async function (err, receipt) {
      if (err) {
        res.status(404).json({'error': 'not found', 'err': err})
        return
      }
      console.log('Removing or Number to the Payment Fee')
      await PaymentFee.update({ '_id': thePayment._id },
        { $set: { 'receipt': null, 'cashTendered': 0, 'cashChange': 0, 'datePaid': null, isPaid: false, 'updated_at': new Date() } },
        {}).exec(async function (err, payment) {
        if (err) {
          res.status(404).json({'error': 'not found', 'err': err})
          return
        }
        EnrollmentFee.update({ '_id': req.body.feeId }, { $set: { isPaid: false } }).exec(function (err, payment) {
          if (err) throw err
          console.log(payment)
        })
        res.status(200).send({
          details: 'cancelled!'
        })
      })
      console.log('done Assigning')
    })
  }
}
