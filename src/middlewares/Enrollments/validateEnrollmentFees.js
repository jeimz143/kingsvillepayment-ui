module.exports = function () {
  return function (req, res, next) {
    var efItemsWithNoQuantity = req.body.fees.filter(f => f.type === 1 && (f.quantity === 0 || f.quantity === null))
    console.log(efItemsWithNoQuantity)
    if (efItemsWithNoQuantity.length !== 0) {
      res.status(200).send({
        error: `Invalid Item! Please add quantity of the item(s)`
      })
      res.end()
    } else {
      next()
    }
  }
}
