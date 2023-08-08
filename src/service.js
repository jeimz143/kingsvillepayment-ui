var Service = require('node-windows').Service

// Create a new service object
var svc = new Service({
  name: 'KingsvillePaymentApp',
  description: 'Payment Management System',
  script: 'D:\\Projects\\artisanscreative\\kingsville\\server\\src\\app.js',
  nodeOptions: [
    '--harmony',
    '--max_old_space_size=4096'
  ],
  env: process.env
  //, workingDirectory: '...'
  //, allowServiceLogon: true
})

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install', function () {
  svc.start()
})

svc.install()
