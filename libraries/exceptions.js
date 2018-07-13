'use strict';

let errors = {};

errors.InvalidValueException = function(message = '', fields = undefined) {
  this.name = 'InvalidValueException';
  this.message = message;
  this.errorCode = 'invalidValue';
  this.errorFields = fields;
  this.stack = (new Error()).stack;
};

errors.InvalidValueException.prototype = Object.create(Error.prototype);
errors.InvalidValueException.constructor = errors.InvalidValueException;
errors.InvalidValueException.prototype.inspect = () => {
  return `${ this.name } : ${ this.message } ${ String(this.stack).substring(0, 500) }`;
};

errors.RecordAlreadyExistsException = function(message = '') {
  this.name = 'RecordAlreadyExistsException';
  this.message = message;
  this.errorCode = 'alreadyExists';
  this.stack = (new Error()).stack;
};

errors.RecordAlreadyExistsException.prototype = Object.create(Error.prototype);
errors.RecordAlreadyExistsException.constructor = errors.RecordAlreadyExistsException;
errors.RecordAlreadyExistsException.prototype.inspect = () => {
  return `${ this.name } : ${ this.message } ${ String(this.stack).substring(0, 500) }`;
};

errors.RecordNotFoundException = function(message = '') {
  this.name = 'RecordNotFoundException';
  this.message = message;
  this.errorCode = 'unknownRecord';
  this.stack = (new Error()).stack;
};

errors.RecordNotFoundException.prototype = Object.create(Error.prototype);
errors.RecordNotFoundException.constructor = errors.RecordNotFoundException;
errors.RecordNotFoundException.prototype.inspect = () => {
  return `${ this.name } : ${ this.message } ${ String(this.stack).substring(0, 500) }`;
};

errors.MissingDataException = function(message = '') {
  this.name = 'MissingDataException';
  this.message = message;
  this.errorCode = 'missingData';
  this.stack = (new Error()).stack;
};

errors.MissingDataException.prototype = Object.create(Error.prototype);
errors.MissingDataException.constructor = errors.MissingDataException;
errors.MissingDataException.prototype.inspect = () => {
  return `${ this.name } : ${ this.message } ${ String(this.stack).substring(0, 500) }`;
};

errors.AuthenticationException = function(code = 'notAuthenticated', message = '') {
  this.name = 'AuthenticationException';
  this.message = message;
  this.errorCode = code;
  this.stack = (new Error()).stack;
};

errors.AuthenticationException.prototype = Object.create(Error.prototype);
errors.AuthenticationException.constructor = errors.AuthenticationException;
errors.AuthenticationException.prototype.inspect = () => {
  return `${ this.name } : ${ this.message } ${ String(this.stack).substring(0, 500) }`;
};

module.exports = errors;