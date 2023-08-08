const { Seeder } = require('mongoose-data-seed')
const Model = require('../../models').Permission

const data = [{ name: 'schoolyear.index' },
  { name: 'schoolyear.create' },
  { name: 'schoolyear.edit' },
  { name: 'student.index' },
  { name: 'student.create' },
  { name: 'student.edit' },
  { name: 'enrollment.index' },
  { name: 'enrollment.create' },
  { name: 'enrollment.edit' },
  { name: 'enrollment.statementofaccount' },
  { name: 'fee.index' },
  { name: 'fee.create' },
  { name: 'fee.edit' },
  { name: 'level.index' },
  { name: 'level.create' },
  { name: 'level.edit' },
  { name: 'reports.payment' },
  { name: 'reports.enrollment' },
  { name: 'payment.index' },
  { name: 'payment.create' },
  { name: 'payment.edit' },
  { name: 'receipt.index' },
  { name: 'receipt.create' },
  { name: 'receipt.edit' }]

class PermissionsSeeder extends Seeder {
  async shouldRun () {
    return Model.countDocuments().exec().then(count => count === 0)
  }

  async run () {
    return Model.create(data)
  }
}

module.exports = PermissionsSeeder
