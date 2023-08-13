'use strict'

const Level = require('../../../models/Level')

module.exports = {
  async Index (req, res) {
    var socketio = req.app.get('socketio')
    var params = {}
    if (req.user.branch !== null) {
      params['branch'] = req.user.branch
    }
    await Level.find(params, function (errLevel, response) {
      if (errLevel) {
        res.status(404).json({'error': 'not found', 'err': errLevel})
        throw errLevel
      } else {
        socketio.emit('LevelList', response)
        res.send({
          details: 'Level Listed!'
        })
      }
    })
  },
  async Picklist (req, res) {
    var query = (req.body.terms) ? { $and: [{ branch: req.body.branch }, { $or: [{ 'name': { $regex: new RegExp(req.body.terms, 'i') } }, { 'code': { $regex: new RegExp(req.body.terms, 'i') } }] }] } : { branch: req.body.branch }
    await Level.find(query).limit(10).exec(function (errLevel, response) {
      if (errLevel) {
        res.status(404).json({'error': 'not found', 'err': errLevel})
        throw errLevel
      } else {
        res.send(response)
      }
    })
  },
  async Store (req, res) {
    var socketio = req.app.get('socketio')
    try {
      await Level.Store(Level, req.body, function (err, level) {
        if (err) throw err
        if (level) {
          Level.find({}, function (errLevel, response) {
            if (errLevel) {
              res.status(404).json({'error': 'not found', 'err': errLevel})
              throw errLevel
            } else {
              res.send({
                details: 'stored!',
                id: level._id
              })
              socketio.emit('LevelList', response)
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
      await Level.findById(req.params.id, function (err, level) {
        if (err) {
          res.status(404).json({'error': 'not found', 'err': err})
          return
        }
        res.send(level)
      })
    } catch (err) {
      console.log(err)
      res.status(400).send({
        error: 'Whoops! Something Went Wrong. Please Try Again'
      })
    }
  },
  async ShowByCode (req, res) {
    try {
      await Level.findOne({ code: req.body.code }, function (err, level) {
        if (err) {
          res.status(404).json({'error': 'not found', 'err': err})
          return
        }
        res.send(level)
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
      await Level.Update(req, function (err, level) {
        if (err) throw err
        if (level) {
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
      await Level.Delete(Level, req.body, function (err, level) {
        if (err) throw err
        if (level) {
          Level.find({}, function (errLevel, response) {
            if (errLevel) {
              res.status(404).json({'error': 'not found', 'err': errLevel})
              throw errLevel
            } else {
              res.send({
                details: 'Level Deleted!'
              })
              socketio.emit('LevelList', response)
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
