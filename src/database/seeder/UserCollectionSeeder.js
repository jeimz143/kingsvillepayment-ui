'use strict'

const mongoose = require('mongoose')
const mongooseeder = require('./mongooseeder')
const mongodbUrl = require('../../mongo.js')()

require('dotenv').config()

var getRole = (userRole, roles) => {
  if (roles.length !== 0) {
    var theRole = roles.find((roleItem) => {
      return roleItem.name === userRole
    })
    return theRole._id
  }
  return null
}

const Role = require('../../models').Role
const User = require('../../models').User

module.exports = {
  roles: [],
  async run () {
    mongoose.set('useNewUrlParser', true)
    mongoose.set('useUnifiedTopology', true)
    mongoose.set('useCreateIndex', true)
    mongooseeder.seed({
      mongodbUrl: mongodbUrl,
      models: [User],
      clean: true,
      mongoose: mongoose,
      seeds: async () => {
        var userQuery = async () => {
          var rolePromise = () => {
            return Role.find({}).exec()
          }
          var ss = rolePromise().then((roles) => {
            var users = []
            users.push({
              lastName: 'Medina',
              givenName: 'Jeimson',
              middleName: 'Dela Cruz',
              role: getRole('Administrator', roles),
              email: 'admin@kingsville.edu.ph',
              gender: 1,
              password: 'secret'
            })

            users.push({
              lastName: 'Angeles',
              givenName: 'Mark Lester',
              middleName: 'Dizon',
              role: getRole('SchoolHead', roles),
              email: 'mark.lester@kingsville.edu.ph',
              gender: 1,
              password: 'secret'
            })

            users.push({
              lastName: 'Pablo',
              givenName: 'Don',
              middleName: '',
              role: getRole('Registrar', roles),
              email: 'pablo.don@kingsville.edu.ph',
              gender: 1,
              password: 'secret'
            })

            users.push({
              lastName: 'Villarica',
              givenName: 'Vanessa',
              middleName: 'Dolor',
              role: getRole('Cashier', roles),
              email: 'cashier@kingsville.edu.ph',
              gender: 1,
              password: 'secret'
            })
            return users
          })

          var result = await ss
          return result
        }

        return userQuery().then((users) => {
          var promises = []
          users.forEach((userItem, userIndex) => {
            var theUser = new User(userItem)
            // console.log(theUser)
            promises.push(theUser.save())
          })
          return Promise.all(promises)
        })
      }
    })
  }
}
