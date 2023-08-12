'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StudentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Users'
  },
  branch: {
    type: String,
    default: null
  },
  studentNumber: {
    type: String,
    required: true,
    unique: true,
    background: false
  },
  email: {
    type: String
  },
  lastName: {
    type: String,
    required: 'Last Name is required'
  },
  givenName: {
    type: String,
    required: 'Given Name is required'
  },
  middleName: {
    type: String
  },
  lrn: {
    type: String
    // required: 'Learning Reference No. is required'
  },
  nickName: {
    type: String
  },
  gender: {
    type: Number
  },
  birthDate: {
    type: Date
  },
  mobileNumber: {
    type: String
  },
  telephoneNumber: {
    type: String
  },
  completeAddress: {
    type: String
  },
  facebook: {
    type: String
  },
  instagram: {
    type: String
  },
  twitter: {
    type: String
  },
  religiousAffiliation: {
    type: String
  },
  lastSchoolAttended: {
    type: String
  },
  honorsAwardsReceived: [
    {
      title: {
        type: String
      },
      description: {
        type: String
      }
    }
  ],
  fatherName: {
    type: String
  },
  fatherMobileNumber: {
    type: String
  },
  motherName: {
    type: String
  },
  motherMobileNumber: {
    type: String
  },
  legalName: {
    type: String
  },
  legalMobileNumber: {
    type: String
  },
  parentsEmail: {
    type: String
  },
  avatar: {
    type: String
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

StudentSchema.statics.Store = async function (Student, request, cb) {
  var today = new Date()
  var total = await Student.countDocuments()
  var dd = String(today.getDate()).padStart(2, '0')
  var mm = String(today.getMonth() + 1).padStart(2, '0')
  var yyyy = today.getFullYear()
  if (!request['studentNumber']) {
    request['studentNumber'] = '00000' + dd + mm + yyyy + total
  }

  var TheStudent = new Student(request)
  // console.log(TheStudent)
  TheStudent.save(function (err, newStudent) {
    if (err) return cb(err)
    if (!newStudent) return cb(err)

    return cb(null, newStudent)
  })
}

StudentSchema.statics.Update = function (req, cb) {
  let vm = this
  var TheStudent = req.body
  vm.update({ _id: req.params.id }, { $set: TheStudent }).exec(function (err, response) {
    if (err) return cb(err)
    return cb(null, response)
  })
}

StudentSchema.statics.Delete = function (model, req, cb) {
  let vm = this
  vm.deleteOne({ _id: { $in: req._id } }, { $set: { deleted_at: Date.now() } }).exec(function (err, response) {
    if (err) return cb(err)
    return cb(null, response)
  })
}

StudentSchema.statics.Destroy = function (req, cb) {
  let vm = this
  vm.destroy({ _id: { $in: req.id } }, { $set: { deleted_at: Date.now() } }).exec(function (err, response) {
    if (err) return cb(err)
    return cb(null, response)
  })
}

module.exports = mongoose.model('Students', StudentSchema)
