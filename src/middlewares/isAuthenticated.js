const passport = require('passport')

module.exports = function () {
  return function (req, res, next) {
    if (!req.header('authorization')) {
      res.status(401).send({
        error: 'you do not have access to this resource'
      })
      res.end()
    }
    passport.authenticate('jwt', function (err, user) {
      if (err || !user) {
        res.status(401).send({
          error: 'you do not have access to this resource'
        })
        res.end()
      } else {
        req.user = user
        next()
      }
    })(req, res, next)
  }
}
