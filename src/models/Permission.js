'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PermissionSchema = new Schema({
  role: {
    type: Schema.Types.ObjectId,
    ref: 'Roles'
  },
  name: {
    type: String,
    Required: 'Permission name is required'
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

module.exports = mongoose.model('Permissions', PermissionSchema)
