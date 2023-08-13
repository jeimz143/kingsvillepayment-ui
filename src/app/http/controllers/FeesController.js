'use strict'

const Fee = require('../../../models/Fee')

module.exports = {
  async Index (req, res) {
    var socketio = req.app.get('socketio')
    var params = {}
    if (req.user.branch !== null) {
      params['branch'] = req.user.branch
    }
    await Fee.find(params, function (errFee, response) {
      if (errFee) {
        res.status(404).json({'error': 'not found', 'err': errFee})
        throw errFee
      } else {
        res.send({
          details: 'Fee Listed!'
        })
        socketio.emit('FeeList', response)
      }
    })
  },
  async Picklist (req, res) {
    var query = (req.body.terms) ? {
      $and: [
        {
          branch: req.body.branch
        },
        {
          $or: [{ 'code': { $regex: new RegExp(req.body.terms, 'i') } }, { 'name': { $regex: new RegExp(req.body.terms, 'i') } }]
        },
        {
          $or: [{ 'isMandatory': false }]
        }
      ]
    } : { 'isMandatory': false }
    await Fee.find(query).limit(10).exec(function (errFee, response) {
      if (errFee) {
        res.status(404).json({'error': 'not found', 'err': errFee})
        throw errFee
      } else {
        res.send(response)
      }
    })
  },
  async Store (req, res) {
    try {
      await Fee.Store(Fee, req.body, function (err, fees) {
        if (err) throw err
        if (fees) {
          res.send({
            details: 'stored!',
            id: fees._id
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
      await Fee.findById(req.params.id, function (err, fees) {
        if (err) {
          res.status(404).json({'error': 'not found', 'err': err})
          return
        }
        res.send(fees)
      })
    } catch (err) {
      console.log(err)
      res.status(400).send({
        error: 'Whoops! Something Went Wrong. Please Try Again'
      })
    }
  },
  async ShowMandatory (req, res) {
    try {
      await Fee.find({ $and: [{ isMandatory: true }, { branch: req.body.branch }] }, function (err, fees) {
        if (err) {
          res.status(404).json({'error': 'not found', 'err': err})
          return
        }
        res.send(fees)
      })
    } catch (err) {
      console.log(err)
      res.status(400).send({
        error: 'Whoops! Something Went Wrong. Please Try Again'
      })
    }
  },
  async Update (req, res) {
    try {
      await Fee.Update(req, function (err, fees) {
        if (err) throw err
        if (fees) {
          res.status(200).send({
            details: 'updated!'
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
      await Fee.Delete(Fee, req.body, function (err, fees) {
        if (err) throw err
        if (fees) {
          Fee.find({}, function (errFee, response) {
            if (errFee) {
              res.status(404).json({'error': 'not found', 'err': errFee})
              throw err
            } else {
              res.send({
                details: 'Fee Deleted!'
              })
              socketio.emit('FeeList', response)
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
