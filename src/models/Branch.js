'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BranchSchema = new Schema({
  code: {
    type: String,
    Required: 'Branch Code is required'
  },
  name: {
    type: String,
    Required: 'Branch name is required'
  },
  address: {
    type: String
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

module.exports = mongoose.model('Branches', BranchSchema)
