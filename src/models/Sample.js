'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SupplierSchema = new Schema({
      name: {
        type: String,
        Required: 'Supplier name is required'
      },
      deleted_at: {
         type: Date,
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

SupplierSchema.statics.Store = function (Supplier, req, cb) {
  let vm = this
  var theSupplier = new Supplier({
    name: req.name,
  })
  theSupplier.save(function (err, newSupplier) {
    if (err) return cb(err)
    if (!newSupplier) return cb(err)

    return cb(null, newSupplier)
  })
}

SupplierSchema.statics.Update = function (req, cb) {
  let vm = this
  var dataSupplier = {
    name: req.body.name,
    updated_at: Date.now()
  }
  vm.update({ _id: req.params.supplierId }, { $set: dataSupplier }).exec(function (err, suppliers) {
    if (err) return cb(err)
    return cb(null, suppliers)
  })
}

SupplierSchema.statics.softDelete = function (Supplier, req, cb) {
  let vm = this
  vm.update({ _id: { $in: req.suppliersIds } }, { $set: { deleted_at: Date.now() } }).exec(function (err, suppliers) {
    if (err) return cb(err)
    return cb(null, suppliers)
  })
}

module.exports = mongoose.model('Suppliers', SupplierSchema);
