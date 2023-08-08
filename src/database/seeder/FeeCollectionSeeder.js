'use strict'

const mongoose = require('mongoose')
const mongooseeder = require('./mongooseeder')
const mongodbUrl = require('../../mongo.js')()

require('dotenv').config()

module.exports = {
  async run () {
    const Fee = require('../../models').Fee

    mongoose.set('useNewUrlParser', true)
    mongoose.set('useUnifiedTopology', true)
    mongoose.set('useCreateIndex', true)
    mongooseeder.seed({
      mongodbUrl: mongodbUrl,
      models: [Fee],
      clean: true,
      mongoose: mongoose,
      seeds: () => {
        var promises = []
        var fees = [
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
            name: 'Registration Fees',
            description: '',
            unitPrice: 0,
            paymentTerm: 1,
            isMandatory: true
          },
          {
            code: '',
            name: 'Tuition Fees',
            description: '',
            unitPrice: 0,
            paymentTerm: 1,
            isMandatory: true
          },
          {
            code: '',
            name: 'Miscellaneous Fees',
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
            name: 'Supplies - All Students',
            description: '(Buwan ng Wika, Literary Meet/Intramurals, Christmast Party, Foundation Day, Support for Little Miss Participation, Class Picture, Pajama Party)',
            unitPrice: 500,
            isAnticipatedEventsAccessories: true
          },
          {
            code: '',
            name: 'Field Trip',
            description: '(Required Field Trip for Pupils/Students)',
            unitPrice: 2850,
            isAnticipatedEventsAccessories: true
          },
          {
            code: '',
            name: 'Royal Ball',
            description: '',
            unitPrice: 1525,
            isAnticipatedEventsAccessories: true
          },
          {
            code: '',
            name: 'Parangal Fee',
            description: '',
            unitPrice: 750,
            forGraduating: true
          },
          {
            code: '',
            name: 'Annual Yearbook Graduating',
            description: '',
            unitPrice: 750,
            forGraduating: true
          },
          {
            code: '',
            name: 'Framed Grad Piture',
            description: '',
            unitPrice: 750,
            forGraduating: true
          },
          {
            code: '',
            name: 'Framed Diploma, Theca, Framed Grad Picture',
            description: '',
            unitPrice: 750,
            forGraduating: true
          },
          {
            code: '',
            name: 'Pin',
            description: '',
            unitPrice: 150,
            forGraduating: true
          },
          {
            code: '',
            name: 'Nameplate',
            description: '',
            unitPrice: 150,
            forGraduating: true
          },
          {
            code: '',
            name: 'Van',
            description: '',
            unitPrice: 100,
            forGraduating: true
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
        fees.forEach(function (feeItem, feeIndex) {
          feeItem['code'] = `KV11001${feeIndex}`
          promises.push(new Fee(feeItem).save())
        })
        return Promise.all(promises)
      }
    })
  }
}
