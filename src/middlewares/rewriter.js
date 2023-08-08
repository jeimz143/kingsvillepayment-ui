module.exports = function (req, res, next) {
  req.body.imageFileUri = req.file.destination + req.file.filename;
  next();
}
