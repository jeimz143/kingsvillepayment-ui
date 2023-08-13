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
    unitPrice: 1000,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Supplies - All Students',
    description: '(Buwan ng Wika, Literary Meet/Intramurals, Christmast Party, Foundation Day, Support for Little Miss Participation, Class Picture, Pajama Party)',
    unitPrice: 500,
    isAnticipatedEventsAccessories: true,
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
    name: 'Kids - PE Shirt Size 10',
    description: '',
    unitPrice: 450,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Kids - PE Shirt Size 12',
    description: '',
    unitPrice: 450,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Kids - PE Shirt Size 14',
    description: '',
    unitPrice: 450,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Kids - PE Shirt Size 16',
    description: '',
    unitPrice: 450,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Kids - PE Shirt Size 18',
    description: '',
    unitPrice: 450,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Kids - PE Short/Skirt Size 10',
    description: '',
    unitPrice: 375,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Kids - PE Short/Skirt Size 12',
    description: '',
    unitPrice: 375,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Kids - PE Short/Skirt Size 14',
    description: '',
    unitPrice: 375,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Kids - PE Short/Skirt Size 16',
    description: '',
    unitPrice: 400,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Kids - PE Short/Skirt Size 18',
    description: '',
    unitPrice: 400,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Kids - PE J-Pants Size 10',
    description: '',
    unitPrice: 450,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Kids - PE J-Pants Size 12',
    description: '',
    unitPrice: 450,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Kids - PE J-Pants Size 14',
    description: '',
    unitPrice: 450,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Kids - PE J-Pants Size 16',
    description: '',
    unitPrice: 475,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Kids - PE J-Pants Size 18',
    description: '',
    unitPrice: 475,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Adult - PE Shirt XS',
    description: '',
    unitPrice: 500,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Adult - PE Shirt S',
    description: '',
    unitPrice: 500,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Adult - PE Shirt M',
    description: '',
    unitPrice: 500,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Adult - PE Shirt L',
    description: '',
    unitPrice: 525,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Adult - PE Shirt XL',
    description: '',
    unitPrice: 550,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Adult - PE Shirt XXL',
    description: '',
    unitPrice: 550,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Adult - PE Short/Skirt XS',
    description: '',
    unitPrice: 425,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Adult - PE Short/Skirt S',
    description: '',
    unitPrice: 425,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Adult - PE Short/Skirt M',
    description: '',
    unitPrice: 425,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Adult - PE Short/Skirt L',
    description: '',
    unitPrice: 500,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Adult - PE Short/Skirt XL',
    description: '',
    unitPrice: 500,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Adult - PE Short/Skirt XXL',
    description: '',
    unitPrice: 500,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Adult - PE J-Pants XS',
    description: '',
    unitPrice: 475,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Adult - PE J-Pants S',
    description: '',
    unitPrice: 475,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Adult - PE J-Pants M',
    description: '',
    unitPrice: 475,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Adult - PE J-Pants L',
    description: '',
    unitPrice: 525,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Adult - PE J-Pants XL',
    description: '',
    unitPrice: 525,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Adult - PE J-Pants XXL',
    description: '',
    unitPrice: 525,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Kids - KVS Small',
    description: '',
    unitPrice: 350,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Kids - KVS Medium',
    description: '',
    unitPrice: 350,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Kids - KVS Large',
    description: '',
    unitPrice: 365,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Kids - KVS X-Large',
    description: '',
    unitPrice: 365,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Kids - KVS XX-Large',
    description: '',
    unitPrice: 375,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Adult - KVS Small',
    description: '',
    unitPrice: 375,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Adult - KVS Medium',
    description: '',
    unitPrice: 385,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Adult - KVS Large',
    description: '',
    unitPrice: 385,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Adult - KVS X-Large',
    description: '',
    unitPrice: 395,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Adult - KVS XX-Large',
    description: '',
    unitPrice: 400,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Kids - Coat',
    description: '',
    unitPrice: 1500,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Adult - Coat',
    description: '',
    unitPrice: 1700,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Tela - White 120/Yrd',
    description: '',
    unitPrice: 120,
    isAnticipatedEventsAccessories: true,
    branch: 'KVB0001'
  },
  {
    code: '',
    name: 'Tela - Checkered 125/Yrd',
    description: '',
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