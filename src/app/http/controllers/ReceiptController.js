'use strict'

const Receipt = require('../../../models/Receipt')

module.exports = {
  async Index (req, res) {
    var socketio = req.app.get('socketio')
    await Receipt.find({}).populate([
      {
        path: 'paymentFee',
        model: 'PaymentFees'
      }
    ]).exec(function (errReceipt, response) {
      if (errReceipt) {
           res.status(404).json({"error":"not found","err":errReceipt});
           throw err;
       } else {
         socketio.emit('ReceiptList', response)
         res.send({
           details: 'Receipt Listedssss!'
         })
       }
    })
  },
  async Picklist (req, res) {
    var query = (req.body.terms) ? { $or: [{ "name": { $regex: new RegExp(req.body.terms, 'i') } }, { "code": { $regex: new RegExp(req.body.terms, 'i') } }] } : {}
    await Receipt.find(query).limit(10).exec(function (errReceipt, response) {
      if (errReceipt) {
           res.status(404).json({"error":"not found","err":errReceipt});
           throw err;
       } else {
         res.send(response)
       }
    })
  },
  async Store (req, res) {
    var socketio = req.app.get('socketio')
    try {
      await Receipt.Store(Receipt, req.body, function (err, receipt) {
        if (err) throw err
        if (receipt) {
          Receipt.find({}, function (errReceipt, response) {
            if (errReceipt) {
                 res.status(404).json({"error":"not found","err":errReceipt});
                 throw err;
             } else {
               res.send({
                 details: 'Receipt Uploaded!'
               })
               socketio.emit('ReceiptList', response)
             }
          })
        }
      })
    } catch (err) {
      console.log(err)
      res.setHeader('Content-Type', 'application/json; charset=utf-8').status(400).send({
          error: "Whoops! Something Went Wrong. Please Try Again"
      })
    }
  },
  async Show (req, res) {
    try {
      await Receipt.findById(req.params.id, function (err, receipt) {
        if (err) {
             res.status(404).json({"error":"not found","err":err});
             return;
         }
         res.send(receipt);
      })
    } catch (err) {
      console.log(err)
      res.status(400).send({
          error: "Whoops! Something Went Wrong. Please Try Again"
      })
    }
  },
  async Update (req, res) {
    var socketio = req.app.get('socketio')
    try {
     await Receipt.Update(req, function (err, receipt) {
        if (err) throw err
        if (receipt) {
          res.status(200).send({
            details: 'updated!'
          })
        }
      })
    } catch (err) {
      console.log(err)
      res.status(400).send({
          error: "Whoops! Something Went Wrong. Please Try Again"
      })
    }
  },
  async Delete(req, res) {
    var socketio = req.app.get('socketio')
    try {
      await Receipt.Delete(Receipt, req.body, function (err, receipt) {
        if (err) throw err
        if (receipt) {
          Receipt.find({}, function (errReceipt, response) {
            if (errReceipt) {
                 res.status(404).json({"error":"not found","err":errReceipt});
                 throw err;
             } else {
               res.send({
                 details: 'Receipt Deleted!'
               })
               socketio.emit('ReceiptList', response)
             }
          })
        }
      })
    } catch (err) {
      console.log(err)
      res.status(400).send({
          error: "Whoops! Something Went Wrong. Please Try Again"
      })
    }
  },
}
