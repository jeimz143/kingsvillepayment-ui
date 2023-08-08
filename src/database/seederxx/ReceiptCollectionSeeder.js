'use strict'

const models = require('../../models')

const receipts = []

const Receipt = models.Receipt

Receipt.deleteMany([])

module.exports = receipts
