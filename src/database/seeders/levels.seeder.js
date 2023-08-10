const { Seeder } = require('mongoose-data-seed')
const Model = require('../../models').Level

const data = [{
  code: 'KGP0000',
  name: 'Pre-Kindergarten',
  description: 'Elementary School',
  unitPrice: 13225,
  miscellUnitPrice: 6613,
  miscellScholarUnitPrice: 5750.00,
  registrationFee: 1500,
  booksUnitPrice: 5350.00
},
{
  code: 'KG0000',
  name: 'Kindergarten',
  description: 'Elementary School',
  unitPrice: 13225,
  miscellUnitPrice: 6613,
  miscellScholarUnitPrice: 5750.00,
  registrationFee: 1500,
  booksUnitPrice: 5350.00
},
{
  code: 'GRLVL0001',
  name: 'Grade 1',
  description: 'Elementary School',
  unitPrice: 13225,
  miscellUnitPrice: 6613,
  miscellScholarUnitPrice: 5750.00,
  registrationFee: 1500,
  booksUnitPrice: 5350.00
},
{
  code: 'GRLVL0002',
  name: 'Grade 2',
  description: 'Elementary School',
  unitPrice: 13225,
  miscellUnitPrice: 6613,
  miscellScholarUnitPrice: 5750.00,
  registrationFee: 1500,
  booksUnitPrice: 6850.00
},
{
  code: 'GRLVL0003',
  name: 'Grade 3',
  description: 'Elementary School',
  unitPrice: 13225,
  miscellUnitPrice: 6613,
  miscellScholarUnitPrice: 5750.00,
  registrationFee: 1500,
  booksUnitPrice: 6850.00
},
{
  code: 'GRLVL0004',
  name: 'Grade 4',
  description: 'Elementary School',
  unitPrice: 13225,
  miscellUnitPrice: 6613,
  miscellScholarUnitPrice: 5750.00,
  registrationFee: 1500,
  booksUnitPrice: 7350.00
},
{
  code: 'GRLVL0005',
  name: 'Grade 5',
  description: 'Elementary School',
  unitPrice: 13225,
  miscellUnitPrice: 6613,
  miscellScholarUnitPrice: 5750.00,
  registrationFee: 1500,
  booksUnitPrice: 7350.00
},
{
  code: 'GRLVL0006',
  name: 'Grade 6',
  description: 'Elementary School',
  unitPrice: 13225,
  miscellUnitPrice: 6613,
  miscellScholarUnitPrice: 5750.00,
  registrationFee: 1500,
  booksUnitPrice: 7350.00
},
{
  code: 'GRLVL0007',
  name: 'Grade 7',
  description: 'Junior High School',
  unitPrice: 13225,
  scholarUnitPrice: 11500,
  miscellUnitPrice: 6613,
  miscellScholarUnitPrice: 5750.00,
  registrationFee: 1500,
  booksUnitPrice: 7350.00,
  booksScholarUnitPrice: 6850.00
},
{
  code: 'GRLVL0008',
  name: 'Grade 8',
  description: 'Junior High School',
  unitPrice: 13225,
  scholarUnitPrice: 11500,
  miscellUnitPrice: 6613,
  miscellScholarUnitPrice: 5750.00,
  registrationFee: 1500,
  booksUnitPrice: 7350.00,
  booksScholarUnitPrice: 6850.00
},
{
  code: 'GRLVL0009',
  name: 'Grade 9',
  description: 'Junior High School',
  unitPrice: 13225,
  scholarUnitPrice: 11500,
  miscellUnitPrice: 6613,
  miscellScholarUnitPrice: 5750.00,
  registrationFee: 1500,
  booksUnitPrice: 7350.00,
  booksScholarUnitPrice: 6850.00
},
{
  code: 'GRLVL0010',
  name: 'Grade 10',
  description: 'Junior High School',
  unitPrice: 13225,
  scholarUnitPrice: 11500,
  miscellUnitPrice: 6613,
  miscellScholarUnitPrice: 5750.00,
  registrationFee: 1500,
  booksUnitPrice: 7350.00,
  booksScholarUnitPrice: 6850.00
},
{
  code: 'GRLVL0011',
  name: 'Grade 11',
  description: 'Senior High School',
  unitPrice: 13225,
  scholarUnitPrice: 11500,
  miscellUnitPrice: 6613,
  miscellScholarUnitPrice: 5750.00,
  registrationFee: 1500,
  booksUnitPrice: 8500.00
},
{
  code: 'GRLVL0012',
  name: 'Grade 12',
  description: 'Senior High School',
  unitPrice: 13225,
  scholarUnitPrice: 11500,
  miscellUnitPrice: 6613,
  miscellScholarUnitPrice: 5750.00,
  registrationFee: 1500,
  booksUnitPrice: 8500.00
}]

class LevelsSeeder extends Seeder {
  async shouldRun () {
    return Model.countDocuments().exec().then(count => count === 0)
  }

  async run () {
    return Model.create(data)
  }
}

module.exports = LevelsSeeder
