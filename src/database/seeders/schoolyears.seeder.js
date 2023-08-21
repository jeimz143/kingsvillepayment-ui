const { Seeder } = require('mongoose-data-seed')
const Model = require('../../models').SchoolYear

const data = [{
  code: '2023-2024',
  schoolStartDate: new Date('2023-08-20'),
  schoolEndDate: new Date('2024-05-20'),
  isOpen: true
}]

class SchoolYearSeeder extends Seeder {
  async shouldRun () {
    return Model.countDocuments().exec().then(count => count === 0)
  }

  async run () {
    return Model.create(data)
  }
}

module.exports = SchoolYearSeeder
