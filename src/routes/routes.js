'use strict'

const Authentication = require('../middlewares/Authentication')
const isAuthenticated = require('../middlewares/isAuthenticated')
const isStudentEnrollable = require('../middlewares/Enrollments/isStudentEnrollable')
const multer = require('multer')
const validateEnrollmentFees = require('../middlewares/Enrollments/validateEnrollmentFees')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, new Date().getTime() + '-' + file.originalname)
  }

})

const upload = multer({ storage: storage })

module.exports = function (app, io) {
  app.use(function (req, res, next) {
    res.io = io
    next()
  })

  io.on('connection', function (socket) {
    console.log('Made Socket connection', socket.id)
  })
  // Authentication
  var Auth = require('../app/http/controllers/AuthController.js')
  app.route('/api/signin').post(Auth.SignIn)
  app.route('/api/signup').post(Auth.SignUp)

  // User
  var userList = require('../app/http/controllers/UserController')
  app.route('/api/users')
    .get(isAuthenticated(), userList.listAllUsers)
    .post(Authentication.register, userList.StoreUser)

  app.route('/api/users/:userId')
    .get(isAuthenticated(), userList.ShowUser)
    .patch(isAuthenticated(), userList.UpdateUser)

  app.route('/api/users/upload/:userId')
    .patch(isAuthenticated(), upload.single('file'), userList.UploadUserProfile)

  // students
  var studentList = require('../app/http/controllers/StudentController')
  app.route('/api/students')
    .get(isAuthenticated(), studentList.Index)
    .post(isAuthenticated(), studentList.Store)
  app.route('/api/students/picklist')
    .post(isAuthenticated(), studentList.Picklist)
  app.route('/api/students/:id')
    .get(isAuthenticated(), studentList.Show)
    .patch(isAuthenticated(), studentList.Update)
    .delete(isAuthenticated(), studentList.Delete)

  // levels
  var levelList = require('../app/http/controllers/LevelController')
  app.route('/api/levels')
    .get(isAuthenticated(), levelList.Index)
    .post(isAuthenticated(), levelList.Store)
  app.route('/api/levels/picklist')
    .post(isAuthenticated(), levelList.Picklist)
  app.route('/api/levels/bycode')
    .post(isAuthenticated(), levelList.ShowByCode)
  app.route('/api/levels/:id')
    .get(isAuthenticated(), levelList.Show)
    .patch(isAuthenticated(), levelList.Update)

  // branches
  var branchList = require('../app/http/controllers/BranchController')
  app.route('/api/branches')
    .get(isAuthenticated(), branchList.Index)
    .post(isAuthenticated(), branchList.Store)
  app.route('/api/branches/picklist')
    .post(isAuthenticated(), branchList.Picklist)
  app.route('/api/branches/bycode')
    .post(isAuthenticated(), branchList.ShowByCode)
  app.route('/api/branches/:id')
    .get(isAuthenticated(), branchList.Show)
    .patch(isAuthenticated(), branchList.Update)

  // schoolyears
  var schoolyearList = require('../app/http/controllers/SchoolYearController')
  app.route('/api/schoolyears')
    .get(isAuthenticated(), schoolyearList.Index)
    .post(isAuthenticated(), schoolyearList.Store)
  app.route('/api/schoolyears/open-year')
    .get(isAuthenticated(), schoolyearList.OpenSchoolYear)
  app.route('/api/schoolyears/picklist')
    .post(isAuthenticated(), schoolyearList.Picklist)
  app.route('/api/schoolyears/:id')
    .get(isAuthenticated(), schoolyearList.Show)
    .patch(isAuthenticated(), schoolyearList.Update)
  app.route('/api/schoolyears/bycode/:schoolYearCode')
    .get(isAuthenticated(), schoolyearList.ShowByCode)

  // discounts
  // var discountList = require('../app/http/controllers/DiscountController')
  // app.route('/api/discounts')
  // .get(isAuthenticated(), discountList.Index)
  // .post(isAuthenticated(), discountList.Store)
  // app.route('/api/discounts/picklist')
  // .post(isAuthenticated(), discountList.Picklist)
  // app.route('/api/discounts/:id')
  // .get(isAuthenticated(), discountList.Show)
  // .patch(isAuthenticated(), discountList.Update)

  // enrollments
  var enrollmentList = require('../app/http/controllers/EnrollmentController')
  app.route('/api/enrollments')
    .get(isAuthenticated(), enrollmentList.Index)
    .post([isAuthenticated(), isStudentEnrollable()], enrollmentList.Store)
  // app.route('/api/enrollments/picklist')
  // .post(enrollmentList.Picklist)
  app.route('/api/enrollments/approve')
    .patch(isAuthenticated(), enrollmentList.ApproveStatus)
  app.route('/api/enrollments/disapprove')
    .patch(isAuthenticated(), enrollmentList.DisapproveStatus)
  app.route('/api/enrollments/:id')
    .get(isAuthenticated(), enrollmentList.Show)
    .patch(isAuthenticated(), validateEnrollmentFees(), enrollmentList.Update)
  app.route('/api/enrollments/post/:id')
    .patch(isAuthenticated(), enrollmentList.UpdatePost)
  app.route('/api/enrollments/count/:studentNumber')
    .get(isAuthenticated(), enrollmentList.CountEnrollment)
  app.route('/api/enrollments/report')
    .post(enrollmentList.EnrolledStudent)
  app.route('/api/enrollments/soa-report')
    .post(enrollmentList.GenerateSOAReport)
  // fees
  var feeList = require('../app/http/controllers/FeesController')
  app.route('/api/fees')
    .get(isAuthenticated(), feeList.Index)
    .post(isAuthenticated(), feeList.Store)
  app.route('/api/fees/mandatory')
    .get(isAuthenticated(), feeList.ShowMandatory)
  app.route('/api/fees/picklist')
    .post(feeList.Picklist)
  app.route('/api/fees/:id')
    .get(isAuthenticated(), feeList.Show)
    .patch(isAuthenticated(), feeList.Update)

  // enrollmentsfees
  var enrollmentFeeList = require('../app/http/controllers/EnrollmentFeeController')
  app.route('/api/enrollmentfees/:id')
    .get(isAuthenticated(), enrollmentFeeList.Show)
    .patch(isAuthenticated(), enrollmentFeeList.Update)

  // payments
  var PaymentList = require('../app/http/controllers/PaymentController')
  app.route('/api/payments/report')
    .post(PaymentList.GenerateReport)
  app.route('/api/payments/daily-report')
    .post(PaymentList.GenerateDailyReport)
  app.route('/api/payments/monthly-report')
    .post(PaymentList.GenerateMonthlyReport)
  app.route('/api/payments/assign-receipt')
    .post(PaymentList.AssignReceipt)
  app.route('/api/payments/cancel-receipt')
    .post(PaymentList.CancelReceipt)
  // receipts
  var receiptList = require('../app/http/controllers/ReceiptController')
  app.route('/api/receipts')
    .get(isAuthenticated(), receiptList.Index)
    .post(isAuthenticated(), receiptList.Store)
  app.route('/api/receipts/picklist')
    .post(isAuthenticated(), receiptList.Picklist)
  app.route('/api/receipts/:id')
    .get(isAuthenticated(), receiptList.Show)
    .patch(isAuthenticated(), receiptList.Update)

  var dashboardList = require('../app/http/controllers/DashboardController')
  app.route('/api/dashboard/daily')
    .post(isAuthenticated(), dashboardList.Daily)
  app.route('/api/dashboard/monthly')
    .post(isAuthenticated(), dashboardList.Monthly)
}
