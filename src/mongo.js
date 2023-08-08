// var env = process.env.NODE_ENV || 'DEVELOPMENT'
var env = 'PRODUCTION'
var config = require('./mongo.json')[env]

const dbConnectionString = function () {
  var envURL = config.use_env_variable
  // var localUrl = 'mongodb://' + config.host + ':' + config.port + '/' + config.database
  var mongoUrl = envURL
  return mongoUrl
}

module.exports = dbConnectionString
