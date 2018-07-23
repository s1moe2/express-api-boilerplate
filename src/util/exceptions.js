class AppException extends Error {
  constructor (message) {

    // Calling parent constructor of base Error class.
    super(message);

    // Saving class name in the property of our custom error as a shortcut.
    this.name = this.constructor.name;

    // Capturing stack trace, excluding constructor call from it.
    Error.captureStackTrace(this, this.constructor);
  }
}

class RecordAlreadyExistsException extends AppException {
  constructor (message) {
    // Providing default message and overriding status code.
    super(message || 'Database record already exists');
  }
}

class RecordNotFoundException extends AppException {
  constructor (message) {
    // Providing default message and overriding status code.
    super(message || 'Record not found');
  }
}

class RecordCreationException extends AppException {
  constructor (message) {
    // Providing default message and overriding status code.
    super(message || 'Record could not be created');
  }
}

module.exports = {
  AppException,
  RecordAlreadyExistsException,
  RecordNotFoundException,
  RecordCreationException
};