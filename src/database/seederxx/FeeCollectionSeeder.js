'use strict'

const models = require('../../models')

const fees = []

const Fee = models.Fee

Fee.deleteMany([])

var theFee = [
  {
    code: '',
    name: 'Books',
    description: 'Student Payment for Books. Payment term is strictly cash basis',
    unitPrice: 0,
    paymentTerm: 1,
    isMandatory: true
  },
  {
    code: '',
    name: 'Tuition & Miscellaneous Fees',
    description: '',
    unitPrice: 0,
    paymentTerm: 1,
    isMandatory: true
  },
  {
    code: '',
    name: 'Event Fee',
    description: '(Buwan ng Wika, Literary Meet/Intramurals, Christmast Party, Foundation Day, Support for Little Miss Participation, Class Picture, Pajama Party)',
    unitPrice: 1000,
    isAnticipatedEventsAccessories: true
  },
  {
    code: '',
    name: 'Field Trip Grade 4 - 12 (Required)',
    description: '(Required Field Trip for Pupils/Students)',
    unitPrice: 2850,
    isAnticipatedEventsAccessories: true
  },
  {
    code: '',
    name: 'Field Trip Grade 7 - 12 (Required)',
    description: '(Buwan ng Wika, Literary Meet/Intramurals, Christmast Party, Foundation Day, Support for Little Miss Participation, Class Picture, Pajama Party)',
    unitPrice: 1375,
    isAnticipatedEventsAccessories: true
  },
  {
    code: '',
    name: 'Supplies - All Students',
    description: '(Buwan ng Wika, Literary Meet/Intramurals, Christmast Party, Foundation Day, Support for Little Miss Participation, Class Picture, Pajama Party)',
    unitPrice: 500,
    isAnticipatedEventsAccessories: true
  },
  {
    code: '',
    name: 'Kids - PE Shirt Size 10',
    description: '',
    unitPrice: 450,
    isAnticipatedEventsAccessories: true
  },
  {
    code: '',
    name: 'Kids - PE Shirt Size 12',
    description: '',
    unitPrice: 450,
    isAnticipatedEventsAccessories: true
  },
  {
    code: '',
    name: 'Kids - PE Shirt Size 14',
    description: '',
    unitPrice: 450,
    isAnticipatedEventsAccessories: true
  },
  {
    code: '',
    name: 'Kids - PE Shirt Size 16',
    description: '',
    unitPrice: 450,
    isAnticipatedEventsAccessories: true
  },
  {
    code: '',
    name: 'Kids - PE Shirt Size 18',
    description: '',
    unitPrice: 450,
    isAnticipatedEventsAccessories: true
  },
  {
    code: '',
    name: 'Kids - PE Short/Skirt Size 10',
    description: '',
    unitPrice: 375,
    isAnticipatedEventsAccessories: true
  },
  {
    code: '',
    name: 'Kids - PE Short/Skirt Size 12',
    description: '',
    unitPrice: 375,
    isAnticipatedEventsAccessories: true
  },
  {
    code: '',
    name: 'Kids - PE Short/Skirt Size 14',
    description: '',
    unitPrice: 375,
    isAnticipatedEventsAccessories: true
  },
  {
    code: '',
    name: 'Kids - PE Short/Skirt Size 16',
    description: '',
    unitPrice: 400,
    isAnticipatedEventsAccessories: true
  },
  {
    code: '',
    name: 'Kids - PE Short/Skirt Size 18',
    description: '',
    unitPrice: 400,
    isAnticipatedEventsAccessories: true
  },
  {
    code: '',
    name: 'Kids - PE J-Pants Size 10',
    description: '',
    unitPrice: 450,
    isAnticipatedEventsAccessories: true
  },
  {
    code: '',
    name: 'Kids - PE J-Pants Size 12',
    description: '',
    unitPrice: 450,
    isAnticipatedEventsAccessories: true
  },
  {
    code: '',
    name: 'Kids - PE J-Pants Size 14',
    description: '',
    unitPrice: 450,
    isAnticipatedEventsAccessories: true
  },
  {
    code: '',
    name: 'Kids - PE J-Pants Size 16',
    description: '',
    unitPrice: 475,
    isAnticipatedEventsAccessories: true
  },
  {
    code: '',
    name: 'Kids - PE J-Pants Size 18',
    description: '',
    unitPrice: 475,
    isAnticipatedEventsAccessories: true
  },
  {
    code: '',
    name: 'Adult - PE Shirt XS',
    description: '',
    unitPrice: 500,
    isAnticipatedEventsAccessories: true
  },
  {
    code: '',
    name: 'Adult - PE Shirt S',
    description: '',
    unitPrice: 500,
    isAnticipatedEventsAccessories: true
  },
  {
    code: '',
    name: 'Adult - PE Shirt M',
    description: '',
    unitPrice: 500,
    isAnticipatedEventsAccessories: true
  },
  {
    code: '',
    name: 'Adult - PE Shirt L',
    description: '',
    unitPrice: 525,
    isAnticipatedEventsAccessories: true
  },
  {
    code: '',
    name: 'Adult - PE Shirt XL',
    description: '',
    unitPrice: 550,
    isAnticipatedEventsAccessories: true
  },
  {
    code: '',
    name: 'Adult - PE Shirt XXL',
    description: '',
    unitPrice: 550,
    isAnticipatedEventsAccessories: true
  },
  {
    code: '',
    name: 'Adult - PE Short/Skirt XS',
    description: '',
    unitPrice: 425,
    isAnticipatedEventsAccessories: true
  },
  {
    code: '',
    name: 'Adult - PE Short/Skirt S',
    description: '',
    unitPrice: 425,
    isAnticipatedEventsAccessories: true
  },
  {
    code: '',
    name: 'Adult - PE Short/Skirt M',
    description: '',
    unitPrice: 425,
    isAnticipatedEventsAccessories: true
  },
  {
    code: '',
    name: 'Adult - PE Short/Skirt L',
    description: '',
    unitPrice: 500,
    isAnticipatedEventsAccessories: true
  },
  {
    code: '',
    name: 'Adult - PE Short/Skirt XL',
    description: '',
    unitPrice: 500,
    isAnticipatedEventsAccessories: true
  },
  {
    code: '',
    name: 'Adult - PE Short/Skirt XXL',
    description: '',
    unitPrice: 500,
    isAnticipatedEventsAccessories: true
  },
  {
    code: '',
    name: 'Adult - PE J-Pants XS',
    description: '',
    unitPrice: 475,
    isAnticipatedEventsAccessories: true
  },
  {
    code: '',
    name: 'Adult - PE J-Pants S',
    description: '',
    unitPrice: 475,
    isAnticipatedEventsAccessories: true
  },
  {
    code: '',
    name: 'Adult - PE J-Pants M',
    description: '',
    unitPrice: 475,
    isAnticipatedEventsAccessories: true
  },
  {
    code: '',
    name: 'Adult - PE J-Pants L',
    description: '',
    unitPrice: 525,
    isAnticipatedEventsAccessories: true
  },
  {
    code: '',
    name: 'Adult - PE J-Pants XL',
    description: '',
    unitPrice: 525,
    isAnticipatedEventsAccessories: true
  },
  {
    code: '',
    name: 'Adult - PE J-Pants XXL',
    description: '',
    unitPrice: 525,
    isAnticipatedEventsAccessories: true
  },
  {
    code: '',
    name: 'Kids - KVS Small',
    description: '',
    unitPrice: 350,
    isAnticipatedEventsAccessories: true
  },
  {
    code: '',
    name: 'Kids - KVS Medium',
    description: '',
    unitPrice: 350,
    isAnticipatedEventsAccessories: true
  },
  {
    code: '',
    name: 'Kids - KVS Large',
    description: '',
    unitPrice: 365,
    isAnticipatedEventsAccessories: true
  },
  {
    code: '',
    name: 'Kids - KVS X-Large',
    description: '',
    unitPrice: 365,
    isAnticipatedEventsAccessories: true
  },
  {
    code: '',
    name: 'Kids - KVS XX-Large',
    description: '',
    unitPrice: 375,
    isAnticipatedEventsAccessories: true
  },
  {
    code: '',
    name: 'Adult - KVS Small',
    description: '',
    unitPrice: 375,
    isAnticipatedEventsAccessories: true
  },
  {
    code: '',
    name: 'Adult - KVS Medium',
    description: '',
    unitPrice: 385,
    isAnticipatedEventsAccessories: true
  },
  {
    code: '',
    name: 'Adult - KVS Large',
    description: '',
    unitPrice: 385,
    isAnticipatedEventsAccessories: true
  },
  {
    code: '',
    name: 'Adult - KVS X-Large',
    description: '',
    unitPrice: 395,
    isAnticipatedEventsAccessories: true
  },
  {
    code: '',
    name: 'Adult - KVS XX-Large',
    description: '',
    unitPrice: 400,
    isAnticipatedEventsAccessories: true
  },
  {
    code: '',
    name: 'Kids - Coat',
    description: '',
    unitPrice: 1500,
    isAnticipatedEventsAccessories: true
  },
  {
    code: '',
    name: 'Adult - Coat',
    description: '',
    unitPrice: 1700,
    isAnticipatedEventsAccessories: true
  },
  {
    code: '',
    name: 'Tela - White 120/Yrd',
    description: '',
    unitPrice: 120,
    isAnticipatedEventsAccessories: true
  },
  {
    code: '',
    name: 'Tela - Checkered 125/Yrd',
    description: '',
    unitPrice: 120,
    isAnticipatedEventsAccessories: true
  }
]
theFee.forEach((feeItem, feeIndex) => {
  feeItem['code'] = `KV11001${feeIndex}`
  fees.push(new Fee(feeItem))
})

module.exports = fees


// {
//   code: '110004',
//   name: 'Texttile',
//   description: 'Student Payment for texttile. Payment term is strictly cash basis',
//   unitPrice: 50,
//   paymentTerm: 1
// },
// {
//   code: '110007',
//   name: 'PIN',
//   description: 'Student Payment for PIN. Payment term is strictly cash basis',
//   unitPrice: 124,
//   paymentTerm: 1
// },
// {
//   code: '110008',
//   name: 'ID Replacement',
//   description: 'Student Payment for ID Replacement. Payment term is strictly cash basis',
//   unitPrice: 124,
//   paymentTerm: 1,
// },
// {
//   code: '110009',
//   name: 'ID Lace',
//   description: 'Student Payment for this fee. Payment term is strictly cash basis',
//   unitPrice: 80,
//   paymentTerm: 1
// },
// {
//   code: '110010',
//   name: 'Fetcher\'s ID',
//   description: 'Student Payment for this fee. Payment term is strictly cash basis',
//   unitPrice: 100,
//   paymentTerm: 1
// },
// {
//   code: '110011',
//   name: 'Notebook',
//   description: 'Student Payment for this fee. Payment term is strictly cash basis',
//   unitPrice: 75,
//   paymentTerm: 1
// },
// {
//   code: '110012',
//   name: 'Test Booklet',
//   description: 'Student Payment for this fee. Payment term is strictly cash basis',
//   unitPrice: 15,
//   paymentTerm: 1
// },
// {
//   code: '110013',
//   name: 'SOA (2nd Copy)',
//   description: 'Student Payment for this fee. Payment term is strictly cash basis',
//   unitPrice: 1500,
//   paymentTerm: 1
// },
// {
//   code: '110014',
//   name: 'Form 137',
//   description: 'Student Payment for this fee. Payment term is strictly cash basis',
//   unitPrice: 3600,
//   paymentTerm: 1
// },
// {
//   code: '110015',
//   name: 'Certification',
//   description: 'Student Payment for this fee. Payment term is strictly cash basis',
//   unitPrice: 2500,
//   paymentTerm: 1
// },
// {
//   code: '110016',
//   name: 'Good Moral Certificate',
//   description: 'Student Payment for this fee. Payment term is strictly cash basis',
//   unitPrice: 1300,
//   paymentTerm: 1
// }
