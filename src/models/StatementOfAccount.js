'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StatementOfAccountschema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Users'
  },
  enrollment: {
    type: Schema.Types.ObjectId,
    ref: 'Enrollments'
  },
  branch: {
    type: String,
    default: null
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

module.exports = mongoose.model('StatementOfAccounts', StatementOfAccountschema)
