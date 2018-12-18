const HttpStatus = require('http-status-codes')

function getFailJson (err, fields = undefined, stackTrace = undefined) {
  return {
    error: err.message,
    errorFields: fields,
    stack: stackTrace,
  }
}

module.exports = (req, res, next) => {
  res.apiSuccess = (data, code = HttpStatus.OK) => {
    res.status(code).json(data || {})
  }

  res.apiError = (err, fields = undefined) => {
    console.error(err)
    const stackTrace = (req.app.get('env') === 'development' || req.app.get('env') === 'test') ? err.stack : undefined

    return res.status(err.status).json(getFailJson(err, fields, stackTrace))
  }

  next()
}
