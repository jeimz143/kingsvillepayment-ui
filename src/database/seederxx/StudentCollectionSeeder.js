'use strict'

const models = require('../../models')
const Excel = require('exceljs')

const Student = models.Student

Student.deleteMany([])
var workbook = new Excel.Workbook()
var stdWorkbook = () => {
  return workbook.xlsx.readFile(`${__dirname}\\..\\data\\Students.xlsx`)
    .then(function () {
      var ws = workbook.getWorksheet('Students')
      var listOfStudents = []
      ws.eachRow(function (row, rowNumber) {
        if (rowNumber !== 1) {
          listOfStudents.push({
            studentNumber: row.getCell(5).value,
            email: row.getCell(2).value,
            lastName: row.getCell(6).value,
            givenName: row.getCell(7).value,
            middleName: row.getCell(8).value,
            lrn: row.getCell(3).value,
            nickName: row.getCell(9).value,
            gender: (row.getCell(10).value === 'Male') ? 1 : 2,
            birthDate: row.getCell(11).value,
            mobileNumber: row.getCell(13).value,
            telephoneNumber: row.getCell(14).value,
            completeAddress: row.getCell(15).value,
            facebook: row.getCell(16).value,
            instagram: row.getCell(18).value,
            twitter: row.getCell(17).value,
            religiousAffiliation: '',
            lastSchoolAttended: row.getCell(12).value,
            fatherName: row.getCell(19).value,
            motherName: row.getCell(20).value,
            legalName: row.getCell(21).value,
            legalMobileNumber: row.getCell(22).value,
            parentsEmail: row.getCell(23).value
          })
        }
      })
      return listOfStudents
    })
}
var stdWorkbookGetter = stdWorkbook()

const xx = async () => {
  var ssContext = await stdWorkbookGetter
  return Student.insertMany(JSON.parse(JSON.stringify(ssContext)), function (err) {
    if (err) {
      console.log(err)
    }
    return 'success'
  })
}
// var today = new Date();
// var dd = String(today.getDate()).padStart(2, '0');
// var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
// var yyyy = today.getFullYear()
// students.push(new Student({
//   studentNumber: '00000' + dd + mm + yyyy + (students.length + 1),
//   email: 'jeffrey.medina@gmail.com',
//   lastName: 'Medina',
//   givenName: 'Jeffrey',
//   middleName: 'Dela Cruz',
//   lrn: '111111111899302',
//   nickName: 'Jeimrey',
//   gender: 0,
//   birthDate: today,
//   mobileNumber: '019275401792',
//   telephoneNumber: '102856710',
//   completeAddress: '#85 Brgy. Lagasit San Quintin Pangasinan',
//   religiousAffiliation: 'None',
//   lastSchoolAttended: 'Kinsville Advanced School System',
//   fatherName: 'Jeffrey Medina Sr.',
//   fatherMobileNumber: '1274192',
//   motherName: 'Imelda Medina',
//   motherMobileNumber: '1254612905',
//   legalName: '',
//   legalMobileNumber: null
// }))
// students.push(new Student({
//   studentNumber: '00000' + dd + mm + yyyy + (students.length + 1),
//   email: 'ayshacastillo@gmail.com',
//   lastName: 'Castillo',
//   givenName: 'Aysha',
//   middleName: 'Parago',
//   lrn: '111111111899303',
//   nickName: 'Aysha',
//   gender: 1,
//   birthDate: today,
//   mobileNumber: '09123489201',
//   telephoneNumber: '09124029',
//   completeAddress: 'Tayug Pangasinan',
//   religiousAffiliation: 'None',
//   lastSchoolAttended: 'Kingsville Advanced School System',
//   fatherName: 'Michael Castillo',
//   fatherMobileNumber: '1274192',
//   motherName: 'Betty Cayabyab',
//   motherMobileNumber: '1254612905',
//   legalName: '',
//   legalMobileNumber: null
// }))
// students.push(new Student({
//   studentNumber: '00000' + dd + mm + yyyy + (students.length + 1),
//   email: 'cremow123@gmail.com',
//   lastName: 'Vhel',
//   givenName: 'Lorenze',
//   middleName: 'Mendoza',
//   lrn: '111111111899304',
//   nickName: 'Vhel',
//   gender: 1,
//   birthDate: today,
//   mobileNumber: '09125071022',
//   telephoneNumber: '09124028',
//   completeAddress: 'Asingan Pangasinan',
//   religiousAffiliation: 'None',
//   lastSchoolAttended: 'Kingsville Advanced School System',
//   fatherName: 'Alex Vhel',
//   fatherMobileNumber: '1224192',
//   motherName: 'Jonna Vhel',
//   motherMobileNumber: '1254612904',
//   legalName: '',
//   legalMobileNumber: null
// }))

module.exports = xx()
