'use strict'

const Discount = require('../../../models/Discount')

module.exports = {
  async Index (req, res) {
    var socketio = req.app.get('socketio')
    await Discount.find({}, function (errDiscount, response) {
      if (errDiscount) {
        res.status(404).json({'error': 'not found', 'err': errDiscount})
        throw errDiscount
      } else {
        socketio.emit('DiscountList', response)
        res.send({
          details: 'Discount Listed!'
        })
      }
    })
  },
  async Store (req, res) {
    var socketio = req.app.get('socketio')
    try {
      await Discount.Store(Discount, req.body, function (err, discount) {
        if (err) throw err
        if (discount) {
          Discount.find({}, function (errDiscount, response) {
            if (errDiscount) {
              res.status(404).json({'error': 'not found', 'err': errDiscount})
              throw err
            } else {
              res.send({
                details: 'stored!',
                id: discount._id
              })
              socketio.emit('DiscountList', response)
            }
          })
        }
      })
    } catch (err) {
      console.log(err)
      res.setHeader('Content-Type', 'application/json; charset=utf-8').status(400).send({
        error: 'Whoops! Something Went Wrong. Please Try Again'
      })
    }
  },
  async Show (req, res) {
    try {
      await Discount.findById(req.params.id, function (err, discount) {
        if (err) {
          res.status(404).json({'error': 'not found', 'err': err})
          return
        }
        res.send(discount)
      })
    } catch (err) {
      console.log(err)
      res.status(400).send({
        error: 'Whoops! Something Went Wrong. Please Try Again'
      })
    }
  },
  async Picklist (req, res) {
    var query = (req.body.terms) ? { $or: [{ 'code': { $regex: new RegExp(req.body.terms, 'i') } }] } : {}
    await Discount.find(query).limit(10).exec(function (errDiscount, response) {
      if (errDiscount) {
        res.status(404).json({'error': 'not found', 'err': errDiscount})
        throw errDiscount
      } else {
        res.send(response)
      }
    })
  },
  async Update (req, res) {
    var socketio = req.app.get('socketio')
    try {
      await Discount.Update(req, function (err, discount) {
        if (err) throw err
        if (discount) {
          Discount.find({}, function (errDiscount, response) {
            if (errDiscount) {
              res.status(404).json({'error': 'not found', 'err': errDiscount})
              throw err
            } else {
              res.status(200).send({
                details: 'updated!'
              })
              socketio.emit('DiscountList', response)
            }
          })
        }
      })
    } catch (err) {
      console.log(err)
      res.status(400).send({
        error: 'Whoops! Something Went Wrong. Please Try Again'
      })
    }
  },
  async Delete (req, res) {
    var socketio = req.app.get('socketio')
    try {
      await Discount.Delete(Discount, req.body, function (err, discount) {
        if (err) throw err
        if (discount) {
          Discount.find({}, function (errDiscount, response) {
            if (errDiscount) {
              res.status(404).json({'error': 'not found', 'err': errDiscount})
              throw err
            } else {
              res.send({
                details: 'Discount Deleted!'
              })
              socketio.emit('DiscountList', response)
            }
          })
        }
      })
    } catch (err) {
      console.log(err)
      res.status(400).send({
        error: 'Whoops! Something Went Wrong. Please Try Again'
      })
    }
  }
}
