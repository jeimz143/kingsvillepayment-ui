'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RoleSchema = new Schema({
  name: {
    type: String,
    Required: 'Role name is required'
  },
  permissions: [
    {
      type: Schema.Types.ObjectId,
      refs: 'Permissions'
    }
  ],
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

module.exports = mongoose.model('Roles', RoleSchema)
