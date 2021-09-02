const { ajv } = require('.');

module.exports.validateCreateCommentInput = ajv.compile({
  type: 'object',
  required: [ 'text', 'postId' ],
  properties: {
    text: {
      type: "string",
      minLength: 1,
      maxLength: 1000,
    },
    postId: { type: "string" }
  },
  errorMessage: {
    properties: {
      text: "A comment must have between 1 and 1000 characters.",
      postId: "PostId must be a string."
    },
  },
});

module.exports.validateUpdateCommentInput = ajv.compile({
  type: 'object',
  required: [ 'text' ],
  properties: {
    text: {
      type: "string",
      minLength: 1,
      maxLength: 1000,
    },
  },
  errorMessage: {
    properties: {
      text: "A comment must have between 1 and 1000 characters.",
    },
  },
});
