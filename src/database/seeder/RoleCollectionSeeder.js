'use strict'

const mongoose = require('mongoose')
const mongooseeder = require('./mongooseeder')
const mongodbUrl = require('../../mongo.js')()

require('dotenv').config()

var getPermissions = (userPermissions, permissions) => {
  var permissionList = []
  userPermissions.forEach((upItem, upIndex) => {
    var p = permissions.find((permissionItem) => {
      return permissionItem.name === upItem
    })
    permissionList.push(p._id)
  })
  return permissionList
}

const Role = require('../../models').Role
const Permission = require('../../models').Permission

module.exports = {
  roles: [],
  async run () {
    mongoose.set('useNewUrlParser', true)
    mongoose.set('useUnifiedTopology', true)
    mongoose.set('useCreateIndex', true)
    mongooseeder.seed({
      mongodbUrl: mongodbUrl,
      models: [Role],
      clean: true,
      mongoose: mongoose,
      seeds: async () => {
        var roleQuery = async () => {
          var permissionPromise = () => {
            return Permission.find({}).exec()
          }
          var ss = permissionPromise().then((permissions) => {
            var roles = []
            roles.push({
              name: 'Administrator',
              permissions: getPermissions(['schoolyear.index', 'schoolyear.edit', 'schoolyear.create', 'student.index', 'student.edit', 'student.create', 'enrollment.index', 'enrollment.edit',
                'enrollment.create', 'enrollment.statementofaccount', 'fee.create', 'fee.index', 'fee.edit', 'level.create',
                'level.index', 'level.edit', 'payment.edit', 'reports.payment', 'reports.enrollment', 'receipt.index', 'receipt.edit', 'receipt.create'], permissions)
            })
            roles.push({
              name: 'Registrar',
              permissions: getPermissions(['schoolyear.index', 'schoolyear.edit', 'schoolyear.create', 'student.index', 'student.edit', 'student.create', 'enrollment.index', 'enrollment.edit',
                'enrollment.create', 'enrollment.statementofaccount', 'fee.create', 'fee.index', 'fee.edit', 'level.create',
                'level.index', 'level.edit', 'payment.edit', 'reports.payment', 'reports.enrollment'], permissions)
            })
            roles.push({
              name: 'Cashier',
              permissions: getPermissions(['enrollment.index', 'enrollment.edit',
                'enrollment.create', 'enrollment.statementofaccount', 'payment.edit', 'reports.payment', 'reports.enrollment'], permissions)
            })
            roles.push({
              name: 'SchoolHead',
              permissions: getPermissions(['enrollment.index', 'enrollment.edit',
                'enrollment.create', 'enrollment.statementofaccount', 'payment.edit', 'reports.payment', 'reports.enrollment'], permissions)
            })
            return roles
          })

          var result = await ss
          return result
        }

        return roleQuery().then((roles) => {
          var promises = []
          roles.forEach((roleItem, roleIndex) => {
            var theRole = new Role(roleItem)
            // console.log(theRole)
            promises.push(theRole.save())
          })
          return Promise.all(promises)
        })
      }
    })
  }
}
