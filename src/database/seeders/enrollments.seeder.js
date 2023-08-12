const { Seeder } = require('mongoose-data-seed')
const Excel = require('exceljs')
const Model = require('../../models')
const Enrollment = Model.Enrollment

class EnrollmentSeeder extends Seeder {
  async beforeRun () {
    this.postData = await this._generateData()
  }
  async shouldRun () {
    return Enrollment.countDocuments().exec().then(count => count === 0)
  }

  async run () {
    return Enrollment.create(this.postData)
  }

  async _generateData () {
    let vm = this
    var workbook = new Excel.Workbook()

    return workbook.xlsx.readFile(`${__dirname}/../data/Students.xlsx`)
      .then(function () {
        var ws = workbook.getWorksheet('Students')
        var listOfEnrollments = []
        ws.eachRow(function (row, rowNumber) {
          if (rowNumber !== 1) {
            var today = new Date()
            var total = listOfEnrollments.length
            var dd = String(today.getDate()).padStart(2, '0')
            var mm = String(today.getMonth() + 1).padStart(2, '0')
            var yyyy = today.getFullYear()
            var theStudentNumber = null
            var studentEndingNumber = rowNumber
            if (row.getCell(5).value === '' || row.getCell(5).value === null) {
              theStudentNumber = `KV2020S${rowNumber}0${(studentEndingNumber < 10) ? `0${studentEndingNumber}` : studentEndingNumber}`
            } else {
              theStudentNumber = row.getCell(5).value
            }
            if (row.getCell(24).value !== null || row.getCell(24).value === 'K1' || row.getCell(24).value === 'K2') {
              listOfEnrollments.push({
                number: '00000' + dd + mm + yyyy + total,
                schoolYearCode: '2020-2021',
                studentNumber: theStudentNumber,
                studentName: `${row.getCell(6).value}, ${row.getCell(7).value} ${row.getCell(8).value}.`,
                levelCode: vm.getLevelCode(row.getCell(24).value),
                levelDescription: vm.getLevelDescription(row.getCell(24).value),
                paymentTerm: (parseInt(vm.getLevelDescription(row.getCell(25).value)) === 'Full Payment') ? 1 : 2,
                discount: (row.getCell(26).value) ? parseInt(row.getCell(26).value) : 0,
                remarks: row.getCell(28).value,
                isReserved: false,
                branch: 'KVB0001'
              })
            }
          }
        })
        return listOfEnrollments
      })
  }

  getLevelCode (value) {
    if (value === 'K1') {
      return 'KGP0000'
    } else if (value === 'K2') {
      return 'KG0000'
    } else {
      var val = parseInt(value)
      if (val < 10) {
        return `GRLVL000${value}`
      } else {
        return `GRLVL00${value}`
      }
    }
  }

  getLevelDescription (value) {
    if (value === 'K1') {
      return 'Pre - Kindergarten'
    } else if (value === 'K2') {
      return 'Kindergarten'
    } else {
      var val = parseInt(value)
      return `Grade ${val}`
    }
  }
}

module.exports = EnrollmentSeeder
