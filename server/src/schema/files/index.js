module.exports = {
  typeDefs: require('../../helpers/importSchema')('src/schema/files/types.graphql'),
  resolvers: require('./resolvers')
};
