const documentStatusEnum = { Pending: 0, Enrolled: 1, Posted: 2, Closed: 3, Cancelled: 4 }
const parseDocumentStatus = function (value) {
  var result
  switch (value) {
    case documentStatusEnum.Enrolled:
      result = 'Enrolled'
      break
    case documentStatusEnum.Posted:
      result = 'Posted'
      break
    case documentStatusEnum.Closed:
      result = 'Closed'
      break
    case documentStatusEnum.Cancelled:
      result = 'Cancelled'
      break
    default:
      result = 'Pending'
  }
  return result
}
module.exports = {
  documentStatusEnum,
  parseDocumentStatus
}