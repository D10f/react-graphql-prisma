const Ajv = require('ajv');
const { UserInputError } = require('apollo-server');

const ajv = new Ajv({
  $data: true,
  allErrors: true,
  removeAdditional: true
});

require("ajv-errors")(ajv);
require("ajv-formats")(ajv);

function validate(jsonSchema) {
  return function(input) {
    const isValid = jsonSchema(input);
    if (isValid) return true;
    const errors = jsonSchema.errors[0].message;
    throw new UserInputError(errors);
  };
}

module.exports.ajv = ajv;

module.exports.validateRegisterUserInput = validate(require('./users').validateRegisterUserInput);
module.exports.validateUpdateUserInput = validate(require('./users').validateUpdateUserInput);

module.exports.validateCreatePostInput = validate(require('./posts').validateCreatePostInput);
module.exports.validateUpdatePostInput = validate(require('./posts').validateUpdatePostInput);

module.exports.validateCreateCommentInput = validate(require('./comments').validateCreateCommentInput);
module.exports.validateUpdateCommentInput = validate(require('./comments').validateUpdateCommentInput);
