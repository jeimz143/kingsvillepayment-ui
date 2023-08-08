'use strict'

const models = require('../../models')

const users = []

const User = models.User
var roles = JSON.parse(JSON.stringify(require('./RoleCollectionSeeder')))

const getRole = (role) => {
  var theRole = roles.find((roleItem) => {
    return roleItem.name === role
  })
  return theRole._id
}

User.deleteMany([])

users.push(new User({
  lastName: 'Medina',
  givenName: 'Jeimson',
  middleName: 'Dela Cruz',
  role: getRole('Administrator'),
  email: 'admin@kingsville.edu.ph',
  gender: 1,
  password: 'secret'
}))

users.push(new User({
  lastName: 'Angeles',
  givenName: 'Mark Lester',
  middleName: 'Dizon',
  role: getRole('SchoolHead'),
  email: 'mark.lester@kingsville.edu.ph',
  gender: 1,
  password: 'secret'
}))

users.push(new User({
  lastName: 'Pablo',
  givenName: 'Don',
  middleName: '',
  role: getRole('Registrar'),
  email: 'pablo.don@kingsville.edu.ph',
  gender: 1,
  password: 'secret'
}))

users.push(new User({
  lastName: 'Villarica',
  givenName: 'Vanessa',
  middleName: 'Dolor',
  role: getRole('Cashier'),
  email: 'cashier@kingsville.edu.ph',
  gender: 1,
  password: 'secret'
}))

module.exports = users
