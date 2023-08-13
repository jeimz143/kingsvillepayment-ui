const { Seeder } = require('mongoose-data-seed')
const Model = require('../../models').SchoolYear

const data = [{
  code: '2020-2021',
  schoolStartDate: '2020-08-20T00:00:00.000+08:00',
  schoolEndDate: '2021-05-20T00:00:00.000+08:00'
},
{
  code: '2023-2024',
  schoolStartDate: '2023-08-20T00:00:00.000+08:00',
  schoolEndDate: '2024-08-20T00:00:00.000+08:00'
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
