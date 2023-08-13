'use strict'

const Branch = require('../../../models/Branch')

module.exports = {
  async Index (req, res) {
    var socketio = req.app.get('socketio')
    var params = {}
    await Branch.find(params, function (errBranch, response) {
      if (errBranch) {
        res.status(404).json({'error': 'not found', 'err': errBranch})
        throw errBranch
      } else {
        socketio.emit('BranchList', response)
        res.send({
          details: 'Branch Listed!'
        })
      }
    })
  },
  async Picklist (req, res) {
    var query = (req.body.terms) ? { $or: [{ 'name': { $regex: new RegExp(req.body.terms, 'i') } }, { 'code': { $regex: new RegExp(req.body.terms, 'i') } }] } : {}
    if (req.user.branch !== null) {
      query = { name: req.user.branch }
    }
    await Branch.find(query).limit(10).exec(function (errBranch, response) {
      if (errBranch) {
        res.status(404).json({'error': 'not found', 'err': errBranch})
        throw errBranch
      } else {
        res.send(response)
      }
    })
  },
  async Store (req, res) {
    var socketio = req.app.get('socketio')
    try {
      await Branch.Store(Branch, req.body, function (err, Branch) {
        if (err) throw err
        if (Branch) {
          Branch.find({}, function (errBranch, response) {
            if (errBranch) {
              res.status(404).json({'error': 'not found', 'err': errBranch})
              throw errBranch
            } else {
              res.send({
                details: 'stored!',
                id: Branch._id
              })
              socketio.emit('BranchList', response)
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
      await Branch.findById(req.params.id, function (err, Branch) {
        if (err) {
          res.status(404).json({'error': 'not found', 'err': err})
          return
        }
        res.send(Branch)
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
      await Branch.findOne({ code: req.body.code }, function (err, Branch) {
        if (err) {
          res.status(404).json({'error': 'not found', 'err': err})
          return
        }
        res.send(Branch)
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
      await Branch.Update(req, function (err, Branch) {
        if (err) throw err
        if (Branch) {
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
      await Branch.Delete(Branch, req.body, function (err, Branch) {
        if (err) throw err
        if (Branch) {
          Branch.find({}, function (errBranch, response) {
            if (errBranch) {
              res.status(404).json({'error': 'not found', 'err': errBranch})
              throw errBranch
            } else {
              res.send({
                details: 'Branch Deleted!'
              })
              socketio.emit('BranchList', response)
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
