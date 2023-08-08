'use strict'

const models = require('../../models')

const roles = []

const Role = models.Role
const Permission = models.Permission
var permissions = JSON.parse(JSON.stringify(require('./PermissionCollectionSeeder')))

var getPermissions = (userPermissions) => {
  var permissionList = []
  userPermissions.forEach((upItem, upIndex) => {
    var p = permissions.find((permissionItem) => {
      return permissionItem.name === upItem
    })
    permissionList.push(p._id)
  })
  return permissionList
}

Role.deleteMany([])

roles.push(new Role({ name: 'Administrator',
  permissions: getPermissions(['schoolyear.index', 'schoolyear.edit', 'schoolyear.create', 'student.index', 'student.edit', 'student.create', 'enrollment.index', 'enrollment.edit',
    'enrollment.create', 'enrollment.statementofaccount', 'fee.create', 'fee.index', 'fee.edit', 'level.create',
    'level.index', 'level.edit', 'payment.edit', 'reports.payment', 'reports.enrollment', 'receipt.index', 'receipt.edit', 'receipt.create']) }))

roles.push(new Role({ name: 'Registrar',
  permissions: getPermissions(['schoolyear.index', 'schoolyear.edit', 'schoolyear.create', 'student.index', 'student.edit', 'student.create', 'enrollment.index', 'enrollment.edit',
    'enrollment.create', 'enrollment.statementofaccount', 'fee.create', 'fee.index', 'fee.edit', 'level.create',
    'level.index', 'level.edit', 'payment.edit', 'reports.payment', 'reports.enrollment']) }))

roles.push(new Role({ name: 'Cashier',
  permissions: getPermissions(['enrollment.index', 'enrollment.edit',
    'enrollment.create', 'enrollment.statementofaccount', 'payment.edit', 'reports.payment', 'reports.enrollment']) }))

roles.push(new Role({ name: 'SchoolHead',
  permissions: getPermissions(['enrollment.index', 'enrollment.edit',
    'enrollment.create', 'enrollment.statementofaccount', 'payment.edit', 'reports.payment', 'reports.enrollment']) }))

module.exports = roles
