const Enrollment = require('../../models/Enrollment')

module.exports = function () {
  return function (req, res, next) {
    if (req.body.studentNumber !== '' && req.body.studentName !== '' && req.body.schoolYearCode !== '' && req.body.levelCode !== '') {
      Enrollment.countDocuments({ $and: [{ studentNumber: req.body.studentNumber, schoolYearCode: req.body.schoolYearCode }, { documentStatus: { $ne: 3 } }] }, function (_err, count) {
        if (count !== 0) {
          res.status(200).send({
            error: `Cannot Enroll ${req.body.studentName}. Student Already Enrolled`
          })
          res.end()
        } else {
          next()
        }
      })
    } else {
      res.status(200).send({
        error: `Please Fill in the required Fields!`
      })
      res.end()
    }
  }
}
