const { Seeder } = require('mongoose-data-seed')
const Model = require('../../models').Fee

const data = [
  {
    code: '',
    name: 'Books',
    description: 'Student Payment for Books. Payment term is strictly cash basis',
    unitPrice: 0,
    paymentTerm: 1,
    isMandatory: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Registration Fees',
    description: '',
    unitPrice: 0,
    paymentTerm: 1,
    isMandatory: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Tuition Fees',
    description: '',
    unitPrice: 0,
    paymentTerm: 1,
    isMandatory: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Miscellaneous Fees',
    description: '',
    unitPrice: 0,
    paymentTerm: 1,
    isMandatory: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Event Fee',
    description: '(Buwan ng Wika, Literary Meet/Intramurals, Christmast Party, Foundation Day, Support for Little Miss Participation, Class Picture, Pajama Party)',
    unitPrice: 1249.00,
    isAnticipatedEventsAccessories: true,
    isMandatory: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Supplies - All Students',
    description: '(Buwan ng Wika, Literary Meet/Intramurals, Christmast Party, Foundation Day, Support for Little Miss Participation, Class Picture, Pajama Party)',
    unitPrice: 500,
    isAnticipatedEventsAccessories: true,
    isMandatory: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Field Trip',
    description: '(Required Field Trip for Pupils/Students)',
    unitPrice: 2850,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Royal Ball',
    description: '',
    unitPrice: 1525,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Parangal Fee',
    description: '',
    unitPrice: 750,
    forGraduating: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Annual Yearbook Graduating',
    description: '',
    unitPrice: 750,
    forGraduating: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Framed Grad Piture',
    description: '',
    unitPrice: 750,
    forGraduating: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Framed Diploma, Theca, Framed Grad Picture',
    description: '',
    unitPrice: 750,
    forGraduating: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Pin',
    description: '',
    unitPrice: 150,
    forGraduating: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Nameplate',
    description: '',
    unitPrice: 150,
    forGraduating: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Van',
    description: '',
    unitPrice: 100,
    forGraduating: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Uniform',
    description: 'Kids - PE Shirt Size 10',
    unitPrice: 450,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Uniform',
    description: 'Kids - PE Shirt Size 12',
    unitPrice: 450,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Uniform',
    description: 'Kids - PE Shirt Size 14',
    unitPrice: 450,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Uniform',
    description: 'Kids - PE Shirt Size 16',
    unitPrice: 450,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Uniform',
    description: 'Kids - PE Shirt Size 18',
    unitPrice: 450,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Uniform',
    description: 'Kids - PE Short/Skirt Size 10',
    unitPrice: 375,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Uniform',
    description: 'Kids - PE Short/Skirt Size 12',
    unitPrice: 375,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Uniform',
    description: 'Kids - PE Short/Skirt Size 14',
    unitPrice: 375,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Uniform',
    description: 'Kids - PE Short/Skirt Size 16',
    unitPrice: 400,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Uniform',
    description: 'Kids - PE Short/Skirt Size 18',
    unitPrice: 400,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Uniform',
    description: 'Kids - PE J-Pants Size 10',
    unitPrice: 450,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Uniform',
    description: 'Kids - PE J-Pants Size 12',
    unitPrice: 450,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Uniform',
    description: 'Kids - PE J-Pants Size 14',
    unitPrice: 450,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Uniform',
    description: 'Kids - PE J-Pants Size 16',
    unitPrice: 475,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Uniform',
    description: 'Kids - PE J-Pants Size 18',
    unitPrice: 475,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Uniform',
    description: 'Adult - PE Shirt XS',
    unitPrice: 500,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Uniform',
    description: 'Adult - PE Shirt S',
    unitPrice: 500,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Uniform',
    description: 'Adult - PE Shirt M',
    unitPrice: 500,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Uniform',
    description: 'Adult - PE Shirt L',
    unitPrice: 525,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Uniform',
    description: 'Adult - PE Shirt XL',
    unitPrice: 550,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Uniform',
    description: 'Adult - PE Shirt XXL',
    unitPrice: 550,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Uniform',
    description: 'Adult - PE Short/Skirt XS',
    unitPrice: 425,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Uniform',
    description: 'Adult - PE Short/Skirt S',
    unitPrice: 425,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Uniform',
    description: 'Adult - PE Short/Skirt M',
    unitPrice: 425,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Uniform',
    description: 'Adult - PE Short/Skirt L',
    unitPrice: 500,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Uniform',
    description: 'Adult - PE Short/Skirt XL',
    unitPrice: 500,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Uniform',
    description: 'Adult - PE Short/Skirt XXL',
    unitPrice: 500,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Uniform',
    description: 'Adult - PE J-Pants XS',
    unitPrice: 475,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Uniform',
    description: 'Adult - PE J-Pants S',
    unitPrice: 475,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Uniform',
    description: 'Adult - PE J-Pants M',
    unitPrice: 475,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Uniform',
    description: 'Adult - PE J-Pants L',
    unitPrice: 525,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Uniform',
    description: 'Adult - PE J-Pants XL',
    unitPrice: 525,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Uniform',
    description: 'Adult - PE J-Pants XXL',
    unitPrice: 525,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Uniform',
    description: 'Kids - KVS Small',
    unitPrice: 350,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Uniform',
    description: 'Kids - KVS Medium',
    unitPrice: 350,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Uniform',
    description: 'Kids - KVS Large',
    unitPrice: 365,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Uniform',
    description: 'Kids - KVS X-Large',
    unitPrice: 365,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Uniform',
    description: 'Kids - KVS XX-Large',
    unitPrice: 375,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Uniform',
    description: 'Adult - KVS Small',
    unitPrice: 375,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Uniform',
    description: 'Adult - KVS Medium',
    unitPrice: 385,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Uniform',
    description: 'Adult - KVS Large',
    unitPrice: 385,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Uniform',
    description: 'Adult - KVS X-Large',
    unitPrice: 395,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Uniform',
    description: 'Adult - KVS XX-Large',
    unitPrice: 400,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Uniform',
    description: 'Kids - Coat',
    unitPrice: 1500,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Uniform',
    description: 'Adult - Coat',
    unitPrice: 1700,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Textile',
    description: 'Tela - White 120/Yrd',
    unitPrice: 120,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Textile',
    description: 'Tela - Checkered 125/Yrd',
    unitPrice: 120,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  }
]

class FeesSeeder extends Seeder {
  beforeRun () {
    var fees = []
    data.forEach(function (feeItem, feeIndex) {
      feeItem['code'] = `KV11001${feeIndex}`
      fees.push(feeItem)
    })
    this.postData = fees
  }
  async shouldRun () {
    return Model.countDocuments().exec().then(count => count === 0)
  }

  async run () {
    return Model.create(this.postData)
  }
}

module.exports = FeesSeeder
