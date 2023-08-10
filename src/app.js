const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const csrf = require('csurf')
const cors = require('cors')
const mongoose = require('mongoose')
const express = require('express')
const socketIO = require('socket.io')
const Http = require('http')

const helmet = require('helmet')
const morgan = require('morgan')

const Discount = require('./models/Discount')
const Role = require('./models/Role')
const Permission = require('./models/Permission')
const User = require('./models/User')
const Student = require('./models/Student')
const Level = require('./models/Level')
const Fee = require('./models/Fee')
const SchoolYear = require('./models/SchoolYear')
const Enrollment = require('./models/Enrollment')
const EnrollmentFee = require('./models/EnrollmentFees')
const PaymentFees = require('./models/PaymentFees')
const Payment = require('./models/Payment')
const Receipt = require('./models/Receipt')

require('dotenv').config()

const port = process.env.PORT || 5000
const env = process.env.NODE_ENV

mongoose.Promise = global.Promise
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', false)

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  autoIndex: false, // Don't build indexes
  // reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  // reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4 // Use IPv4, skip trying IPv6
}
if (env !== 'PRODUCTION') {
  mongoose.connect('mongodb://localhost:27017/DBTEST', options)
} else {
  mongoose.connect(process.env.MONGO_DB_URL, options)
}
const app = express()

app.use(helmet())
app.use(morgan('combined'))
app.use('/avatar', express.static('storage/uploads'))
app.use('/statics', express.static('storage/statics'))
app.use('/statics/downloads', express.static('storage/downloads'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
//
var whitelist = ['http://localhost:8080', 'http://localhost:5000', 'https://kingsvillepayment.herokuapp.com']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(whitelist))
require('./passport')
var server = Http.createServer(app)
var io = socketIO(server)
app.set('socketio', io)
var routes = require('./routes/routes')
routes(app, io)
if (env === 'PRODUCTION') {
  app.use(express.static(__dirname + '/public/'))
  // handle SPA
  app.get(/.*/, (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
  })
}

server.listen(port, function () {
  if (port) {
    console.log('listening at port: ' + port + ' running in ' + env + ' mode.')
  }
})
