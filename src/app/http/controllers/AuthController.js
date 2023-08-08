const User = require('../../../models/User')
const jwt = require('jsonwebtoken')
const config = require('../../../config/config')

function jwtSignUser (user) {
  // const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, { expiresIn: 9999999 })
}
module.exports = {
  async SignIn (req, res) {
    try {
      const { email, password } = req.body
      await User.getAuthenticated(email, password, function (err, user, reason) {
        if (err) throw err

        // login was successful if we have a user
        if (user) {
          const userJson = user
          res.send({
            user: userJson,
            token: jwtSignUser(userJson)
          })
        }

        // otherwise we can determine why we failedd
        var reasons = User.failedLogin
        switch (reason) {
          case reasons.NOT_FOUND:
          case reasons.PASSWORD_INCORRECT:
            res.status(401).send({
              error: 'Email or Password is incorrect',
              errtype: 1
            })
            break
          case reasons.MAX_ATTEMPTS:
            res.status(400).send({
              error: 'You have reached the maximum attempt account will be locked for two hours.',
              errtype: 2
            })
            break
        }
      })
    } catch (err) {
      console.log(err)
      return res.status(403).send({
        error: 'An error has occured trying to sign in'
      })
    }
  },
  async SignUp (req, res) {
    try {
      let request = req.body
      const user = new User({
        name: request.name,
        email: request.email,
        password: request.password
      })
      User.createNewAccount(user, function (err, user) {
        if (err) throw err
        if (user) {
          const userJson = user.toJSON()
          res.send({
            user: userJson,
            token: jwtSignUser(userJson)
          })
        }
      })
    } catch (err) {
      console.log(err)
      return res.status(403).send({
        error: 'An error has occured trying to sign up'
      })
    }
  }
}
