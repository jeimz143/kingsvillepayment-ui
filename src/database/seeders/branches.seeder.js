const { Seeder } = require('mongoose-data-seed')
const Model = require('../../models').Branch

const data = [{ code: 'KVB0001', name: 'Tayug' }, { code: 'KVB0002', name: 'Umingan' }]

class BranchSeeder extends Seeder {
  async shouldRun () {
    return Model.countDocuments().exec().then(count => count === 0)
  }

  async run () {
    return Model.create(data)
  }
}

module.exports = BranchSeeder
