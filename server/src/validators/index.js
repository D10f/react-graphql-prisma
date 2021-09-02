const Ajv = require('ajv');
const { UserInputError } = require('apollo-server');

const ajv = new Ajv({
  $data: true,
  allErrors: true,
  removeAdditional: true
});

require('ajv-errors')(ajv);
require('ajv-formats')(ajv);
// require('ajv-sanitizer')(ajv);

function addCustomErrors(errors) {
  return errors.map(error => ({
    field: error.instancePath.replace('/', ''),
    message: error.message
  }));
}

function validate(jsonSchema) {
  return function(input) {
    const isValid = jsonSchema(input);
    if (isValid) return true;
    throw new UserInputError('User Input Validation Error', {
      errors: addCustomErrors(jsonSchema.errors)
    });
  };
}

module.exports.ajv = ajv;

module.exports.validateRegisterUserInput = validate(require('./users').validateRegisterUserInput);
module.exports.validateUpdateUserInput = validate(require('./users').validateUpdateUserInput);

module.exports.validateCreatePostInput = validate(require('./posts').validateCreatePostInput);
module.exports.validateUpdatePostInput = validate(require('./posts').validateUpdatePostInput);

module.exports.validateCreateCommentInput = validate(require('./comments').validateCreateCommentInput);
module.exports.validateUpdateCommentInput = validate(require('./comments').validateUpdateCommentInput);
