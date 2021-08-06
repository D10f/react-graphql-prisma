const { ajv } = require('.');

module.exports.validateRegisterUserInput = ajv.compile({
  type: 'object',
  required: [ 'username', 'email', 'password', 'confirmPassword' ],
  properties: {
    username: { type: 'string', minLength: 2 },
    email: { type: 'string', format: 'email' },
    password: { type: 'string', minLength: 8 },
    confirmPassword: { const: { $data: '1/password' }},
    role: { type: 'string', enum: [ 'USER', 'ADMIN' ] }
  },
  errorMessage: {
    properties: {
      username: "You must provide a username at least 2 characters long.",
      email: "You must provide a valid email address.",
      password: "Passwords must be at least 8 characters long.",
      confirmPassword: "Passwords do not match.",
      role: "Role must be one of USER or ADMIN",
    },
  },
});

module.exports.validateUpdateUserInput = ajv.compile({
  type: 'object',
  properties: {
    username: { type: 'string', minLength: 2 },
    email: { type: 'string', format: 'email' },
    password: { type: 'string', minLength: 8 },
    role: { type: 'string', enum: [ 'USER', 'ADMIN' ] }
  },
  errorMessage: {
    properties: {
      username: "You must provide a username at least 2 characters long.",
      email: "You must provide a valid email address.",
      password: "Passwords must be at least 8 characters long.",
      role: "Role must be one of USER or ADMIN",
    },
  },
});
