
const dbConnectionString = function () {
  var envURL = process.MONGO_DB_URL

  var mongoUrl = envURL
  return mongoUrl
}

module.exports = dbConnectionString()
