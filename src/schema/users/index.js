module.exports = {
  typeDefs: require('../../helpers/importSchema')('src/schema/users/typeDefs.graphql'),
  resolvers: require('./resolvers')
};
