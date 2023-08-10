const { Seeder } = require('mongoose-data-seed')
const Excel = require('exceljs')
const Model = require('../../models').Student

class StudentsSeeder extends Seeder {
  async beforeRun () {
    this.postData = this._generateData()
    console.log(this.postData)
  }
  async shouldRun () {
    return Model.countDocuments().exec().then(count => count === 0)
  }

  async run () {
    return Model.create(this.postData)
  }

  _generateData () {
    var workbook = new Excel.Workbook()

    return workbook.xlsx.readFile(`${__dirname}/../data/Students.xlsx`)
      .then(function () {
        var ws = workbook.getWorksheet('Students')
        var listOfStudents = []
        ws.eachRow(function (row, rowNumber) {
          if (rowNumber !== 1) {
            var theStudentNumber = null
            var studentEndingNumber = rowNumber
            if (row.getCell(5).value === '' || row.getCell(5).value === null) {
              theStudentNumber = `KV2020S${rowNumber}0${(studentEndingNumber < 10) ? `0${studentEndingNumber}` : studentEndingNumber}`
            } else {
              theStudentNumber = row.getCell(5).value
            }
            var theStudent = {
              studentNumber: theStudentNumber,
              lastName: (row.getCell(6).value) ? row.getCell(6).value : '',
              givenName: (row.getCell(7).value) ? row.getCell(7).value : '',
              middleName: (row.getCell(8).value) ? row.getCell(8).value : '',
              lrn: (row.getCell(3).value) ? row.getCell(3).value : 0,
              nickName: (row.getCell(9).value) ? row.getCell(9).value : '',
              gender: (row.getCell(10).value === 'Male') ? 1 : 2,
              birthDate: (row.getCell(11).value) ? row.getCell(11).value : '',
              mobileNumber: (row.getCell(13).value) ? row.getCell(13).value : '',
              telephoneNumber: (row.getCell(14).value) ? row.getCell(14).value : '',
              completeAddress: (row.getCell(15).value) ? row.getCell(15).value : '',
              facebook: (row.getCell(16).value) ? row.getCell(16).value : '',
              instagram: (row.getCell(18).value) ? row.getCell(18).value : '',
              twitter: (row.getCell(17).value) ? row.getCell(17).value : '',
              religiousAffiliation: '',
              lastSchoolAttended: (row.getCell(12).value) ? row.getCell(12).value : '',
              fatherName: (row.getCell(19).value) ? row.getCell(19).value : '',
              motherName: (row.getCell(20).value) ? row.getCell(20).value : '',
              legalName: (row.getCell(21).value) ? row.getCell(21).value : '',
              legalMobileNumber: (row.getCell(22).value) ? row.getCell(22).value : '',
              parentsEmail: (row.getCell(23).value) ? row.getCell(23).value : ''
            }
            if (row.getCell(2).value) {
              theStudent['email'] = row.getCell(2).value
            }
            listOfStudents.push(theStudent)
          }
        })
        return listOfStudents
      })
  }
}

module.exports = StudentsSeeder
