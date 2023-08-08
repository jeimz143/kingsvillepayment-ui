'use strict'

const SchoolYear = require('../../../models/SchoolYear')

module.exports = {
  async Index (req, res) {
    var socketio = req.app.get('socketio')
    await SchoolYear.find({}, function (errSchoolYear, response) {
      if (errSchoolYear) {
        res.status(404).json({'error': 'not found', 'err': errSchoolYear})
        throw errSchoolYear
      } else {
        socketio.emit('SchoolYearList', response)
        res.send({
          details: 'SchoolYear Listed!'
        })
      }
    })
  },
  async Picklist (req, res) {
    var query = (req.body.terms) ? { $or: [{ 'code': { $regex: new RegExp(req.body.terms, 'i') } }], isOpen: true } : { isOpen: true }
    await SchoolYear.find(query).limit(10).exec(function (errSchoolYear, response) {
      if (errSchoolYear) {
        res.status(404).json({'error': 'not found', 'err': errSchoolYear})
        throw errSchoolYear
      } else {
        res.send(response)
      }
    })
  },
  // async Index (req, res) {
  //   var socketio = req.app.get('socketio')
  //   await SchoolYear.find({}, function (errSchoolYear, response) {
  //     if (errSchoolYear) {
  //       res.status(404).json({'error': 'not found', 'err': errSchoolYear})
  //       throw errSchoolYear
  //     } else {
  //       socketio.emit('SchoolYearList', response)
  //       res.send({
  //         details: 'SchoolYear Listed!'
  //       })
  //     }
  //   })
  // },
  async Store (req, res) {
    var socketio = req.app.get('socketio')
    try {
      await SchoolYear.Store(SchoolYear, req.body, function (err, schoolYear) {
        if (err) throw err
        if (schoolYear) {
          SchoolYear.find({}, function (errSchoolYear, response) {
            if (errSchoolYear) {
              res.status(404).json({'error': 'not found', 'err': errSchoolYear})
              throw errSchoolYear
            } else {
              res.send({
                details: 'stored!',
                id: schoolYear._id
              })
              socketio.emit('SchoolYearList', response)
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
      await SchoolYear.findById(req.params.id, function (err, schoolYear) {
        if (err) {
          res.status(404).json({'error': 'not found', 'err': err})
          return
        }
        res.send(schoolYear)
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
      await SchoolYear.findOne({ code: req.params.schoolYearCode }, function (err, schoolYear) {
        if (err) {
          console.log(err)
          res.status(404).json({'error': 'not found', 'err': err})
          return
        }
        console.log(schoolYear, '', req.params.schoolYearCode)
        res.send(schoolYear)
      })
    } catch (err) {
      console.log(err)
      res.status(400).send({
        error: 'Whoops! Something Went Wrong. Please Try Again'
      })
    }
  },
  async Update (req, res) {
    var socketio = req.app.get('socketio')
    try {
      await SchoolYear.Update(req, function (err, schoolYear) {
        if (err) throw err
        if (schoolYear) {
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
      await SchoolYear.Delete(SchoolYear, req.body, function (err, schoolYear) {
        if (err) throw err
        if (schoolYear) {
          SchoolYear.find({}, function (errSchoolYear, response) {
            if (errSchoolYear) {
              res.status(404).json({'error': 'not found', 'err': errSchoolYear})
              throw errSchoolYear
            } else {
              res.send({
                details: 'SchoolYear Deleted!'
              })
              socketio.emit('SchoolYearList', response)
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
  async OpenSchoolYear (req, res) {
    try {
      SchoolYear.find({ isOpen: true }, function (errSchoolYear, response) {
        if (errSchoolYear) {
          res.status(404).json({'error': 'not found', 'err': errSchoolYear})
          throw errSchoolYear
        } else {
          res.send(response)
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
