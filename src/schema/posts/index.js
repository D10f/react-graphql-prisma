module.exports = {
  typeDefs: require('../../helpers/importSchema')('src/schema/posts/typeDefs.graphql'),
  resolvers: require('./resolvers')
};
