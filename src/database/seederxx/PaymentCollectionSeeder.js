'use strict'

const models = require('../../models')

const payments = []

const Payment = models.Payment

Payment.deleteMany([])


module.exports = payments
