'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DiscountSchema = new Schema({
  code: {
    type: String,
    Required: 'Discount Code is required'
  },
  name: {
    type: String,
    Required: 'Discount name is required'
  },
  percentage: {
    type: Number,
    Required: 'Percentage is required'
  },
  deleted_at: {
    type: Date
  },
  updated_at: {
    type: Date,
    default: Date.now()
  },
  created_at: {
    type: Date,
    default: Date.now()
  }
})

DiscountSchema.statics.Store = function (Discount, req, cb) {
  let vm = this
  var theDiscount = new Discount(req)
  theDiscount.save(function (err, newDiscount) {
    if (err) return cb(err)
    if (!newDiscount) return cb(err)

    return cb(null, newDiscount)
  })
}

DiscountSchema.statics.Update = function (req, cb) {
  let vm = this
  var dataDiscount = {
    code: req.body.code,
    name: req.body.name,
    percentage: req.body.percentage,
    updated_at: Date.now()
  }
  console.log(req.params)
  vm.update({ _id: req.params.id }, { $set: dataDiscount }).exec(function (err, discounts) {
    if (err) return cb(err)
    return cb(null, discounts)
  })
}

DiscountSchema.statics.softDelete = function (Discount, req, cb) {
  let vm = this
  vm.update({ _id: { $in: req.discountsIds } }, { $set: { deleted_at: Date.now() } }).exec(function (err, discounts) {
    if (err) return cb(err)
    return cb(null, discounts)
  })
}

module.exports = mongoose.model('Discounts', DiscountSchema)
