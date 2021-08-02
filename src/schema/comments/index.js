module.exports = {
  typeDefs: require('../../helpers/importSchema')('src/schema/comments/typeDefs.graphql'),
  resolvers: require('./resolvers')
};
