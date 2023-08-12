'use strict'

const Student = require('../../../models/Student')

module.exports = {
  async Index (req, res) {
    var socketio = req.app.get('socketio')
    var params = {}
    if (req.user.branch) {
      params['branch'] = req.user.branch
    }
    await Student.find(params, function (errStudent, response) {
      if (errStudent) {
        res.status(404).json({ 'error': 'not found', 'err': errStudent })
        throw errStudent
      } else {
        socketio.emit('StudentList', response)
        res.send({
          details: 'Student Listed!'
        })
      }
    })
  },
  async Store (req, res) {
    var socketio = req.app.get('socketio')
    try {
      await Student.Store(Student, req.body, function (err, student) {
        if (err) throw err
        if (student) {
          Student.find({}, function (errStudent, response) {
            if (errStudent) {
              res.status(404).json({ 'error': 'not found', 'err': errStudent })
              throw err
            } else {
              res.send({
                details: 'stored!',
                id: student._id
              })
              socketio.emit('StudentList', response)
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
      await Student.findById(req.params.id, function (err, student) {
        if (err) {
          res.status(404).json({ 'error': 'not found', 'err': err })
          return
        }
        res.send(student)
      })
    } catch (err) {
      console.log(err)
      res.status(400).send({
        error: 'Whoops! Something Went Wrong. Please Try Again'
      })
    }
  },
  async Picklist (req, res) {
    var query = (req.body.terms) ? { $or: [{ 'studentNumber': { $regex: new RegExp(req.body.terms, 'i') } }, { 'lastName': { $regex: new RegExp(req.body.terms, 'i') } }, { 'givenName': { $regex: new RegExp(req.body.terms, 'i') } }] } : {}
    console.log(new RegExp('^' + req.body.terms, 'i'))
    await Student.find(query).limit(10).exec(function (errStudent, response) {
      if (errStudent) {
        res.status(404).json({ 'error': 'not found', 'err': errStudent })
        throw errStudent
      } else {
        res.send(response)
      }
    })
  },
  async Update (req, res) {
    var socketio = req.app.get('socketio')
    try {
      await Student.Update(req, function (err, student) {
        if (err) throw err
        if (student) {
          Student.find({}, function (errStudent, response) {
            if (errStudent) {
              res.status(404).json({ 'error': 'not found', 'err': errStudent })
              throw err
            } else {
              res.status(200).send({
                details: 'updated!'
              })
              socketio.emit('StudentList', response)
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
      await Student.Delete(Student, req.body, function (err, student) {
        if (err) throw err
        if (student) {
          Student.find({}, function (errStudent, response) {
            if (errStudent) {
              res.status(404).json({ 'error': 'not found', 'err': errStudent })
              throw err
            } else {
              res.send({
                details: 'Student Deleted!'
              })
              socketio.emit('StudentList', response)
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
