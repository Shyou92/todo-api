const Unauthorized = require('./Unauthorized');
const NotFound = require('./NotFound');
const BadRequest = require('./BadRequest');
const Forbidden = require('./Forbidden');
const Conflict = require('./Conflict');
const MongoValidationError = require('./MongoValidationError');

module.exports = {
  Unauthorized,
  NotFound,
  BadRequest,
  Forbidden,
  Conflict,
  MongoValidationError,
};
