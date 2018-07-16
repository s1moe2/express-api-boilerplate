const errors = require('throw.js');
const _ = require('lodash');

module.exports = {
  validateId: (req, res, next, value) => {
    if (_.isNaN(parseInt(value))) {
      return next(new errors.BadRequest());
    }

    return next();
  }
};