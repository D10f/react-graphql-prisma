const { mergeTypeDefs } = require('@graphql-tools/merge');

const usersSchema = require('./users');
const postsSchema = require('./posts');
const commentsSchema = require('./comments');
const filesSchema = require('./files');

module.exports = {
  typeDefs: mergeTypeDefs([
    usersSchema.typeDefs,
    postsSchema.typeDefs,
    commentsSchema.typeDefs,
    filesSchema.typeDefs,
  ]),
  resolvers: [
    usersSchema.resolvers,
    postsSchema.resolvers,
    commentsSchema.resolvers,
    filesSchema.resolvers,
  ]
};
