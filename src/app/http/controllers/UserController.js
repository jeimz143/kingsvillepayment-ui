'use strict'

const User = require('../../../models/User')

module.exports = {
  listAllUsers (req, res) {
    // console.log(res.io.emit('test', 'whye'))
    User.find({}, function (err, user) {
      if (err) {
        res.status(404).json({'error': 'not found', 'err': err})
        return
      }
      res.json(user)
    })
  },
  StoreUser (req, res) {
    var new_user = new User(req.body)
    new_user.save(function (err, user) {
      if (err) {
        res.status(404).json({'error': 'not found', 'err': err})
        return
      }
      res.json(user)
    })
  },
  ShowUser (req, res) {
    User.findById(req.params.userId, function (err, user) {
      if (err) {
        res.status(404).json({'error': 'not found', 'err': err})
        return
      }
      res.json(user)
    })
  },
  UpdateUser (req, res) {
    User.updateUser(req, function (err, user, reason) {
      if (err) throw err

      if (user) {
        const userJson = user.toJSON()
        res.send({
          user: userJson
        })
      } else {
        res.status(400).send({
          error: 'Whoops! Something Went Wrong. Please Try Again'
        })
      }
    })
  },
  AddUserAddress (req, res) {
    User.addUserAddress(req, function (err, user, reason) {
      if (err) throw err

      if (user) {
        const userJson = user.toJSON()
        res.send({
          user: userJson
        })
      } else {
        res.status(400).send({
          error: 'Whoops! Something Went Wrong. Please Try Again'
        })
      }
    })
  },
  UpdateUserAddress (req, res) {
    User.UpdateUserAddress(req, function (err, user, reason) {
      if (err) throw err

      if (user) {
        const userJson = user.toJSON()
        res.send({
          user: userJson
        })
      } else {
        res.status(400).send({
          error: 'Whoops! Something Went Wrong. Please Try Again'
        })
      }
    })
  },
  SetDefaultAddress (req, res) {
    User.SetDefaultAddress(req, function (err, user, reason) {
      if (err) throw err

      if (user) {
        const userJson = user.toJSON()
        res.send({
          user: userJson
        })
      } else {
        res.status(400).send({
          error: 'Whoops! Something Went Wrong. Please Try Again'
        })
      }
    })
  },
  DeleteUserAddress (req, res) {
    User.DeleteUserAddress(req, function (err, user, reason) {
      if (err) throw err

      if (user) {
        const userJson = user.toJSON()
        res.send({
          user: userJson
        })
      } else {
        res.status(400).send({
          error: 'Whoops! Something Went Wrong. Please Try Again'
        })
      }
    })
  },
  AddUserBank (req, res) {
    User.addUserBank(req, function (err, user, reason) {
      if (err) throw err

      if (user) {
        const userJson = user.toJSON()
        res.send({
          user: userJson
        })
      } else {
        res.status(400).send({
          error: 'Whoops! Something Went Wrong. Please Try Again'
        })
      }
    })
  },
  UpdateUserBank (req, res) {
    User.UpdateUserBank(req, function (err, user, reason) {
      if (err) throw err

      if (user) {
        const userJson = user.toJSON()
        res.send({
          user: userJson
        })
      } else {
        res.status(400).send({
          error: 'Whoops! Something Went Wrong. Please Try Again'
        })
      }
    })
  },
  SetDefaultBank (req, res) {
    User.SetDefaultBank(req, function (err, user, reason) {
      if (err) throw err

      if (user) {
        const userJson = user.toJSON()
        res.send({
          user: userJson
        })
      } else {
        res.status(400).send({
          error: 'Whoops! Something Went Wrong. Please Try Again'
        })
      }
    })
  },
  DeleteUserBank (req, res) {
    User.DeleteUserBank(req, function (err, user, reason) {
      if (err) throw err

      if (user) {
        const userJson = user.toJSON()
        res.send({
          user: userJson
        })
      } else {
        res.status(400).send({
          error: 'Whoops! Something Went Wrong. Please Try Again'
        })
      }
    })
  },
  UploadUserProfile (req, res) {
    User.UploadUserProfile(req, function (err, user, reason) {
      if (err) throw err

      if (user) {
        const userJson = user.toJSON()
        res.send({
          user: userJson
        })
      } else {
        res.status(400).send({
          error: 'Whoops! Something Went Wrong. Please Try Again'
        })
      }
    })
  }
}
