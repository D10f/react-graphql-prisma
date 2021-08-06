module.exports = {
  typeDefs: require('../../helpers/importSchema')('src/schema/comments/types.graphql'),
  resolvers: require('./resolvers')
};
