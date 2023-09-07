const { Seeder } = require('mongoose-data-seed')
const Model = require('../../models').Branch

const data = [{
    code: 'KVB0001',
    name: 'Tayug',
    address: 'Tayug, Pangasinan',
    assignedCashier: 'Francis Grace O. Baybayan',
    assignedOfficeManager: 'Leslie F. Loyola',
    assignedSchoolHead: 'Dondon S. Pablo'
  },
  {
    code: 'KVB0002',
    name: 'Umingan',
    address: 'Umingan, Pangasinan',
    assignedCashier: 'Francis Grace O. Baybayan',
    assignedOfficeManager: 'Leslie F. Loyola',
    assignedSchoolHead: 'Dondon S. Pablo'
  }]

class BranchSeeder extends Seeder {
  async shouldRun () {
    return Model.countDocuments().exec().then(count => count === 0)
  }

  async run () {
    return Model.create(data)
  }
}

module.exports = BranchSeeder
