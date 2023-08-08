module.exports = function (req, res, next) {
  const contentType = req.headers["content-type"];
    // Make sure it's multipart/form
    if (!contentType || !contentType.includes("multipart/form-data")) {
        // Stop middleware chain and send a status

        return res.sendStatus(500);

    }
    console.log('==============' + contentType)
    next();
}
