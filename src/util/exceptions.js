const HttpStatus = require('http-status-codes')

class AppException extends Error {
  constructor (message, status = HttpStatus.INTERNAL_SERVER_ERROR) {
    // Calling parent constructor of base Error class.
    super(message)

    // Saving class name in the property of our custom error as a shortcut.
    this.name = this.constructor.name
    this.status = status

    // Capturing stack trace, excluding constructor call from it.
    Error.captureStackTrace(this, this.constructor)
  }
}

class RecordAlreadyExistsException extends AppException {
  constructor (message) {
    super(message || 'Database record already exists', HttpStatus.CONFLICT)
  }
}

class RecordNotFoundException extends AppException {
  constructor (message) {
    super(message || 'Record not found', HttpStatus.NOT_FOUND)
  }
}

class RouteNotFoundException extends AppException {
  constructor (message) {
    super(message || 'Route not found', HttpStatus.NOT_FOUND)
  }
}

class RecordCreationException extends AppException {
  constructor (message) {
    super(message || 'Record could not be created', HttpStatus.INTERNAL_SERVER_ERROR)
  }
}

class AuthenticationException extends AppException {
  constructor (message) {
    super(message || 'Authentication Exception', HttpStatus.UNAUTHORIZED)
  }
}

class InvalidParametersException extends AppException {
  constructor (message) {
    super(message || 'Invalid Parameters Exception', HttpStatus.BAD_REQUEST)
  }
}

class InvalidTokenException extends AppException {
  constructor (message) {
    super(message || 'Invalid Token Exception', HttpStatus.BAD_REQUEST)
  }
}

module.exports = {
  AppException,
  RecordAlreadyExistsException,
  RecordNotFoundException,
  RouteNotFoundException,
  RecordCreationException,
  AuthenticationException,
  InvalidParametersException,
  InvalidTokenException,
}
