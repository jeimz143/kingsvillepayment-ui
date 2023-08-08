const Mongooseeder = {}

// Internal mongoose reference
// must be passed by user
// otherwise multiple instances
// are created and don't work together
let _mongoose

// Connect to MongoDB with the user
// provided mongoose instance
// If options is a string assume it is a URL
// otherwise use options host and database
// to construct the URL
// Connects only if not already connected
const _connect = (options) => {
  let mongodbUrl = typeof options === 'string'
    ? options
    : `mongodb://${options.host}/${options.database}`

  return _mongoose.connection.readyState
    ? Promise.resolve()
    : _mongoose.connect(mongodbUrl)
}

// Removes all documents from the provided
// models
// The models argument should be an object
// where each key is the model name
// and the value is the model class
const _clean = (models) => {
  const modelNames = Object.keys(models)

  const promises = []
  modelNames.forEach(modelName => {
    const model = models[modelName]
    const promise = model.deleteMany()
    promises.push(promise)
  })

  return Promise.all(promises)
}

// Seeds MongoDB with the user provided
// mongoose instance
// Cleans the database only if the clean
// option is truthy
// Models passed with be cleaned
// Seeds will be run after cleaning
// Uses user provided mongoose instance
Mongooseeder.seed = (options) => {
  const {
    mongodbUrl,
    database,
    host,
    clean,
    models,
    seeds,
    mongoose
  } = options

  _mongoose = mongoose

  return _connect(mongodbUrl || { host, database })
    .then(() => clean)
    .then(() => clean && _clean(models))
    .then(() => seeds())
    .catch(err => { throw err })
    .then(() => mongoose.disconnect())
}

// Connects to database
// Cleans provided models
// Uses user provided mongoose instance
Mongooseeder.clean = (options) => {
  const {
    mongodbUrl,
    database,
    host,
    models,
    mongoose
  } = options

  _mongoose = mongoose

  console.log('Connecting...')
  return _connect(mongodbUrl || { host, database })
    .then(() => console.log('Cleaning...'))
    .then(() => _clean(models))
    .catch(err => { throw err })
    .then(() => mongoose.disconnect())
}

module.exports = Mongooseeder
