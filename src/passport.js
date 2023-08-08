const config = require('./config/config')
const passport = require('passport')

const models = require('./models')
const User = models.User

const {Strategy, ExtractJwt} = require('passport-jwt')

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.authentication.jwtSecret
}
passport.use(
  new Strategy(opts, async function (jwtPayload, done) {
    try {
      var user = jwtPayload
      if (!user) {
        return done(new Error(), false)
      }
      return done(null, user)
    } catch (err) {
      return done(new Error(), false)
    }
  })
)

module.exports = null
