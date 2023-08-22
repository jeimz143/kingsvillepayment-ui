'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EnrollmentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Users'
  },
  branch: {
    type: String,
    default: null
  },
  number: {
    type: String,
    required: true,
    unique: true,
    index: true,
    background: false
  },
  schoolYearCode: {
    type: String,
    Required: 'School Year is Required'
  },
  studentNumber: {
    type: String,
    Required: 'Student Number is required'
  },
  studentName: {
    type: String,
    Required: 'Student Name is required'
  },
  levelCode: {
    type: String,
    Required: 'Level Code is required'
  },
  levelDescription: {
    type: String,
    Required: 'Level Description is required'
  },
  paymentTerm: {
    type: Number,
    Required: 'Payment Term is required'
  },
  fees: [
    {
      type: Schema.Types.ObjectId,
      ref: 'EnrollmentFees'
    }
  ],
  isScholar: {
    type: Boolean,
    default: false
  },
  discount: {
    type: Number,
    default: 0
  },
  isReserved: {
    type: Boolean,
    default: false
  },
  remarks: {
    type: String
  },
  updated_at: {
    type: Date,
    default: Date.now()
  },
  created_at: {
    type: Date,
    default: Date.now()
  },
  documentStatus: {
    type: Number,
    default: 0
  }
})

EnrollmentSchema.statics.Store = async function (Enrollment, EnrollmentFee, PaymentFee, SchoolYear, request, user, cb) {
  var today = new Date()
  var total = await Enrollment.countDocuments()
  var dd = String(today.getDate()).padStart(2, '0')
  var mm = String(today.getMonth() + 1).padStart(2, '0')
  var yyyy = today.getFullYear()
  request['number'] = '00000' + dd + mm + yyyy + total
  var TheEnrollment = new Enrollment(request)
  var enrollmentFeesIds = []
  request.fees.forEach((feesItem, feesIndex) => {
    delete feesItem._id
    feesItem['userId'] = user._id
    feesItem['enrollment'] = TheEnrollment._id
    feesItem['branch'] = request.branch
    var TheEnrollmentFee = new EnrollmentFee(feesItem)
    enrollmentFeesIds.push(mongoose.Types.ObjectId(TheEnrollmentFee._id))
    TheEnrollmentFee.save()
  })
  TheEnrollment.fees = enrollmentFeesIds
  TheEnrollment['userId'] = user._id
  if (request.isScholar) {
    TheEnrollment['documentStatus'] = 1
  }
  TheEnrollment.save(async function (err, newEnrollment) {
    if (err) return cb(err)
    if (!newEnrollment) return cb(err)
    await PaymentFee.StorePaymentFee(newEnrollment, EnrollmentFee, PaymentFee, SchoolYear, request)
    return cb(null, newEnrollment)
  })
}
EnrollmentSchema.statics.ApproveStatus = async function (Enrollment, req, cb) {
  let vm = this
  var setData = {
    documentStatus: 1
  }
  vm.update({ _id: req.body._id }, { $set: setData }).exec(function (err, response) {
    if (err) return cb(err)
    return cb(null, response)
  })
}
EnrollmentSchema.statics.DisapproveStatus = async function (Enrollment, req, cb) {
  let vm = this
  var setData = {
    documentStatus: 3
  }
  vm.update({ _id: req.body._id }, { $set: setData }).exec(function (err, response) {
    if (err) return cb(err)
    return cb(null, response)
  })
}
EnrollmentSchema.statics.Update = async function (Enrollment, EnrollmentFee, req, cb) {
  let vm = this
  var TheEnrollment = JSON.parse(JSON.stringify(req.body))
  var enrollmentFeesIds = []
  var existingFees = await EnrollmentFee.find({ enrollment: TheEnrollment._id }).select('_id').exec()
  var parseExistingFees = JSON.parse(JSON.stringify(existingFees))
  parseExistingFees.forEach((existingFeeItem, existingFeeIndex) => {
    var isFeeDeleted = TheEnrollment.fees.find((feeItem) => feeItem._id === existingFeeItem._id)
    if (!isFeeDeleted) {
      EnrollmentFee.deleteOne({ _id: existingFeeItem._id }).exec()
    }
  })
  TheEnrollment.fees.forEach((feesItem, feesIndex) => {
    var TheEnrollmentFee = null
    if (feesItem.isNew) {
      delete feesItem._id
      feesItem['enrollment'] = TheEnrollment._id
      TheEnrollmentFee = new EnrollmentFee(feesItem)
      TheEnrollmentFee.save()
    } else {
      TheEnrollmentFee = feesItem
      EnrollmentFee.update({ _id: TheEnrollmentFee._id }, {$set: TheEnrollmentFee}).exec()
    }
    enrollmentFeesIds.push(mongoose.Types.ObjectId(TheEnrollmentFee._id))
  })
  var setData = {
    number: TheEnrollment.number,
    studentNumber: TheEnrollment.studentNumber,
    studentName: TheEnrollment.studentName,
    levelCode: TheEnrollment.levelCode,
    levelDescription: TheEnrollment.levelDescription,
    paymentTerm: TheEnrollment.paymentTerm,
    fees: enrollmentFeesIds,
    isScholar: TheEnrollment.isScholar,
    updated_at: Date.now()
  }
  vm.update({ _id: req.params.id }, { $set: setData }).exec(function (err, response) {
    if (err) return cb(err)
    return cb(null, response)
  })
}
EnrollmentSchema.statics.UpdatePost = async function (Enrollment, EnrollmentFee, req, cb) {
  let vm = this
  var TheEnrollment = JSON.parse(JSON.stringify(req.body))
  var enrollmentFeesIds = []
  var existingFees = await EnrollmentFee.find({ enrollment: TheEnrollment._id }).select('_id').exec()
  var parseExistingFees = JSON.parse(JSON.stringify(existingFees))
  parseExistingFees.forEach((existingFeeItem, existingFeeIndex) => {
    var isFeeDeleted = TheEnrollment.fees.find((feeItem) => feeItem._id === existingFeeItem._id)
    if (!isFeeDeleted) {
      EnrollmentFee.deleteOne({ _id: existingFeeItem._id }).exec()
    }
  })
  TheEnrollment.fees.forEach((feesItem, feesIndex) => {
    var TheEnrollmentFee = null
    if (feesItem.isNew) {
      delete feesItem._id
      feesItem['enrollment'] = TheEnrollment._id
      TheEnrollmentFee = new EnrollmentFee(feesItem)
      TheEnrollmentFee.save()
    } else {
      TheEnrollmentFee = feesItem
      EnrollmentFee.update({ _id: TheEnrollmentFee._id }, {$set: TheEnrollmentFee}).exec()
    }
    enrollmentFeesIds.push(mongoose.Types.ObjectId(TheEnrollmentFee._id))
  })
  var setData = {
    number: TheEnrollment.number,
    studentNumber: TheEnrollment.studentNumber,
    studentName: TheEnrollment.studentName,
    levelCode: TheEnrollment.levelCode,
    levelDescription: TheEnrollment.levelDescription,
    paymentTerm: TheEnrollment.paymentTerm,
    fees: enrollmentFeesIds,
    updated_at: Date.now(),
    isScholar: TheEnrollment.isScholar,
    documentStatus: 2
  }
  vm.update({ _id: req.params.id }, { $set: setData }).exec(function (err, response) {
    if (err) return cb(err)
    return cb(null, response)
  })
}
EnrollmentSchema.statics.Delete = function (req, cb) {
  let vm = this
  vm.update({ _id: { $in: req.id } }, { $set: { deleted_at: Date.now() } }).exec(function (err, response) {
    if (err) return cb(err)
    return cb(null, response)
  })
}

EnrollmentSchema.statics.Destroy = function (req, cb) {
  let vm = this
  vm.destroy({ _id: { $in: req.id } }, { $set: { deleted_at: Date.now() } }).exec(function (err, response) {
    if (err) return cb(err)
    return cb(null, response)
  })
}

module.exports = mongoose.model('Enrollments', EnrollmentSchema)
