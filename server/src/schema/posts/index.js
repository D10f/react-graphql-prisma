module.exports = {
  typeDefs: require('../../helpers/importSchema')('src/schema/posts/types.graphql'),
  resolvers: require('./resolvers')
};
