const { Seeder } = require('mongoose-data-seed')
const Model = require('../../models')
const Role = Model.Role
const Permission = Model.Permission

class PermissionsSeeder extends Seeder {
  async beforeRun () {
    const permissions = await Permission.find({}).exec()
    this.postData = this._generateList(permissions)
  }

  async shouldRun () {
    return Role.countDocuments().exec().then(count => count === 0)
  }

  async run () {
    return Role.create(this.postData)
  }

  _generateList (permissions) {
    const datalist = []
    const permissionList = [
      {
        name: 'Administrator',
        permissions: ['schoolyear.index', 'schoolyear.edit', 'schoolyear.create', 'student.index', 'student.edit', 'student.create', 'enrollment.index', 'enrollment.edit',
          'enrollment.create', 'enrollment.statementofaccount', 'fee.create', 'fee.index', 'fee.edit', 'level.create',
          'level.index', 'level.edit', 'payment.edit', 'reports.payment', 'reports.enrollment', 'receipt.index', 'receipt.edit', 'receipt.create']
      },
      {
        name: 'Registrar',
        permissions: ['schoolyear.index', 'schoolyear.edit', 'schoolyear.create', 'student.index', 'student.edit', 'student.create', 'enrollment.index', 'enrollment.edit',
          'enrollment.create', 'enrollment.statementofaccount', 'fee.create', 'fee.index', 'fee.edit', 'level.create',
          'level.index', 'level.edit', 'payment.edit', 'reports.payment', 'reports.enrollment']
      },
      {
        name: 'Cashier',
        permissions: ['enrollment.index', 'enrollment.edit', 'enrollment.create', 'enrollment.statementofaccount', 'payment.edit', 'reports.payment', 'reports.enrollment']
      },
      {
        name: 'SchoolHead',
        permissions: ['enrollment.index', 'enrollment.edit', 'enrollment.create', 'enrollment.statementofaccount', 'payment.edit', 'reports.payment', 'reports.enrollment']
      }
    ]
    permissionList.forEach((upItem, upIndex) => {
      const dataItem = {
        name: upItem.name,
        permissions: []
      }
      upItem.permissions.forEach((p) => {
        var pq = permissions.find((permissionItem) => {
          return permissionItem.name === p
        })
        dataItem.permissions.push(pq._id)
      })

      datalist.push(dataItem)
    })

    return datalist
  }
}

module.exports = PermissionsSeeder
