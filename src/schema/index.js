const { mergeTypeDefs } = require('@graphql-tools/merge');

const usersSchema = require('./users');
const postsSchema = require('./posts');
const commentsSchema = require('./comments');

module.exports = {
  typeDefs: mergeTypeDefs([
    usersSchema.typeDefs,
    postsSchema.typeDefs,
    commentsSchema.typeDefs,
  ]),
  resolvers: [
    usersSchema.resolvers,
    postsSchema.resolvers,
    commentsSchema.resolvers,
  ]
};
