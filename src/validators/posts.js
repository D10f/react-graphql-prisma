const { ajv } = require('.');

module.exports.validateCreatePostInput = ajv.compile({
  type: 'object',
  required: [ 'title', 'body', 'authorId' ],
  properties: {
    title: { type: 'string', minLength: 1, maxLength: 100 },
    body: { type: 'string' },
    published: { type: 'boolean' },
    authorId: { type: 'number' },
  },
  errorMessage: {
    properties: {
      title: "Title must be a string between 1 and 100 characters long.",
      body: "Body of the post must be a string",
      published: "Published status must be a boolean.",
      authorId: "AuthorId must be provided as a number",
    },
  },
});

module.exports.validateUpdatePostInput = ajv.compile({
  type: 'object',
  properties: {
    title: { type: 'string', minLength: 1, maxLength: 100 },
    body: { type: 'string' },
    published: { type: 'boolean' },
    authorId: { type: 'number' },
  },
  errorMessage: {
    properties: {
      title: "You must provide a title with 100 characters maximum length.",
      body: "Body of the post must be a string",
      published: "Published status must be a boolean.",
      authorId: "AuthorId must be provided as a number",
    },
  },
});
