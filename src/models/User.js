'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bcrypt = require('bcryptjs')
const SALT_WORK_FACTOR = 10
const MAX_LOGIN_ATTEMPTS = 5
const LOCK_TIME = 2 * 60 * 60 * 1000

const UsersSchema = new Schema({
  lastName: {
    type: String,
    Required: 'Last Name is required'
  },
  givenName: {
    type: String,
    Required: 'Given Name is required'
  },
  middleName: {
    type: String,
    Required: 'Middle Name is required'
  },
  email: {
    type: String,
    Required: 'Please Enter your email',
    index: { unique: true }
  },
  gender: {
    type: Number
  },
  birthdate: {
    type: Date
  },
  password: {
    type: String,
    Required: 'Please Enter your password'
  },
  address: [
    {
      name: {
        type: String,
        Required: 'Please Enter your name'
      },
      phoneNumber: {
        type: String,
        Requered: 'Please Enter your Phone number'
      },
      postalCode: {
        type: Number,
        Required: 'Please Enter your Postal Code'
      },
      description: {
        type: String,
        Required: 'Please Enter your Complete Address'
      },
      isDefaultAddress: Boolean,
      isPickUpAddress: Boolean
    }
  ],
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
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: 'Roles'
  },
  loginAttempts: { type: Number, required: true, default: 0 },
  lockUntil: { type: Number }
})

UsersSchema.virtual('isLocked').get(function () {
  // check for a future lockUntil timestamp
  return !!(this.lockUntil && this.lockUntil > Date.now())
})

UsersSchema.pre('save', function (next) {
  var user = this

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next()

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err)

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err)

      // override the cleartext password with the hashed one
      user.password = hash
      next()
    })
  })
})

UsersSchema.methods.setRoleAndPermissions = (user) => {
  var theUser = JSON.parse(JSON.stringify(user))
  theUser['role'] = user.role.name
  theUser['permissions'] = user.role.permissions.map((permission) => {
    return permission.name
  })
  return theUser
}

UsersSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err)
    cb(null, isMatch)
  })
}

UsersSchema.methods.toJSON = function () {
  var obj = this.toObject()
  delete obj.password
  return obj
}

UsersSchema.methods.incLoginAttempts = function (cb) {
  // if we have a previous lock that has expired, restart at 1
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.update({
      $set: { loginAttempts: 1 },
      $unset: { lockUntil: 1 }
    }, cb)
  }
  // otherwise we're incrementing
  var updates = { $inc: { loginAttempts: 1 } }
  // lock the account if we've reached max attempts and it's not locked already
  if (this.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !this.isLocked) {
    updates.$set = { lockUntil: Date.now() + LOCK_TIME }
  }
  return this.update(updates, cb)
}

// expose enum on the model, and provide an internal convenience reference
var reasons = UsersSchema.statics.failedLogin = {
  NOT_FOUND: 0,
  PASSWORD_INCORRECT: 1,
  MAX_ATTEMPTS: 2
}
UsersSchema.statics.UploadUserProfile = function (req, cb) {
  let vm = this
  vm.update({ _id: req.params.userId }, { $set: { 'avatar': req.file.filename } }, { safe: true }, function (err, user) {
    if (!user) {
      return cb(null, null, reasons.NOT_FOUND)
    } else {
      vm.findOne({ _id: req.params.userId }).populate('banks.bank').exec(function (err, userDetail) {
        if (err) {
          return cb(null, null, reasons.NOT_FOUND)
        }
        return cb(null, userDetail)
      })
    }
  })
}
UsersSchema.statics.DeleteUserAddress = function (req, cb) {
  let vm = this
  vm.update({ _id: req.params.userId }, { $pull: { address: { _id: req.params.addressId} } }, { safe: true }, function (err, user) {
    if (!user) {
      return cb(null, null, reasons.NOT_FOUND)
    } else {
      vm.findOne({ _id: req.params.userId }).populate('banks.bank').exec(function (err, userDetail) {
        if (err) {
          return cb(null, null, reasons.NOT_FOUND)
        }
        return cb(null, userDetail)
      })
    }
  })
}
UsersSchema.statics.SetDefaultAddress = function (req, cb) {
  let vm = this
  vm.update({ _id: req.params.userId }, { $set: { 'address.$[].isDefaultAddress': false } }, function (err, user) {
    if (!user) {
      return cb(null, null, reasons.NOT_FOUND)
    } else {
      vm.update({ 'address._id': req.params.addressId }, { $set: { 'address.$.isDefaultAddress': true } }, function (err, user) {
        if (!user) {
          return cb(null, null, reasons.NOT_FOUND)
        } else {
          vm.findOne({ _id: req.params.userId }).populate('banks.bank').exec(function (err, userDetail) {
            if (err) {
              return cb(null, null, reasons.NOT_FOUND)
            }
            return cb(null, userDetail)
          })
        }
      })
    }
  })
}
UsersSchema.statics.UpdateUserAddress = function (req, cb) {
  let vm = this
  const AddressDetails = {
    'address.$.name': req.body.name,
    'address.$.phoneNumber': req.body.phoneNumber,
    'address.$.postalCode': req.body.postalCode,
    'address.$.description': req.body.description,
    'address.$.isDefaultAddress': req.body.isDefaultAddress,
    'address.$.isPickUpAddress': req.body.isPickUpAddress
  }
  vm.update({ 'address._id': req.params.addressId }, { $set: AddressDetails }, function (err, userRaw) {
    if (!userRaw) {
      return cb(null, null, reasons.NOT_FOUND)
    } else {
      vm.findOne({ _id: req.params.userId }).populate('banks.bank').exec(function (err, userDetail) {
        if (err) {
          return cb(null, null, reasons.NOT_FOUND)
        }
        return cb(null, userDetail)
      })
    }
  })
}
UsersSchema.statics.addUserAddress = function (req, cb) {
  let vm = this
  const AddressDetails = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    postalCode: req.body.postalCode,
    description: req.body.description,
    isDefaultAddress: req.body.isDefaultAddress,
    isPickUpAddress: req.body.isPickUpAddress
  }
  vm.update({ _id: req.params.userId }, { $push: { address: AddressDetails } }, function (err, userRaw) {
    if (!userRaw) {
      return cb(null, null, reasons.NOT_FOUND)
    } else {
      vm.findOne({ _id: req.params.userId }).populate('banks.bank').exec(function (err, userDetail) {
        if (err) {
          return cb(null, null, reasons.NOT_FOUND)
        }
        return cb(null, userDetail)
      })
    }
  })
}
UsersSchema.statics.updateUser = function (req, cb) {
  let vm = this
  const userNewDetails = {
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    birthdate: req.body.birthdate,
    updated_at: Date.now()
  }
  vm.update({ _id: req.params.userId }, userNewDetails, function (err, userRaw) {
    if (!userRaw) {
      return cb(null, null, reasons.NOT_FOUND)
    } else {
      vm.findOne({ _id: req.params.userId }).populate('banks.bank').exec(function (err, userDetail) {
        if (err) {
          return cb(null, null, reasons.NOT_FOUND)
        }
        return cb(null, userDetail)
      })
    }
  })
}
UsersSchema.statics.createNewAccount = function (model, cb) {
  model.save(function (err, newUser) {
    if (err) return cb(err)
    if (newUser) {
      return cb(null, newUser)
    }
  })
}
UsersSchema.statics.getAuthenticated = function (email, password, cb, register) {
  let query = this
  if (register) {
    query = mongoose.model('Users', UsersSchema)
  }
  query.findOne({ email: email }).populate([
    {
      path: 'role',
      model: 'Roles',
      populate: [
        {
          path: 'permissions',
          model: 'Permissions'
        }
      ]
    }
  ]).exec(function (err, user) {
    if (err) return cb(err)

    // make sure the user exists
    if (!user) {
      return cb(null, null, reasons.NOT_FOUND)
    }

    // check if the account is currently locked
    if (user.isLocked) {
      // just increment login attempts if account is already locked
      return user.incLoginAttempts(function (err) {
        if (err) return cb(err)
        return cb(null, null, reasons.MAX_ATTEMPTS)
      })
    }

    // test for a matching password
    user.comparePassword(password, function (err, isMatch) {
      if (err) return cb(err)

      // check if the password was a match
      if (isMatch) {
        // setup permissions
        var parsedUser = user.setRoleAndPermissions(user)
        // if there's no lock or failed attempts, just return the user
        if (!user.loginAttempts && !user.lockUntil) return cb(null, parsedUser)
        // reset attempts and lock info
        var updates = {
          $set: { loginAttempts: 0 },
          $unset: { lockUntil: 1 }
        }
        return user.update(updates, function (err) {
          if (err) return cb(err)
          return cb(null, user)
        })
      }

      // password is incorrect, so increment login attempts before responding
      user.incLoginAttempts(function (err) {
        if (err) return cb(err)
        return cb(null, null, reasons.PASSWORD_INCORRECT)
      })
    })
  })
}

module.exports = mongoose.model('Users', UsersSchema)
