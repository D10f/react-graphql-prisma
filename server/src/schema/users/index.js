module.exports = {
  typeDefs: require('../../helpers/importSchema')('src/schema/users/types.graphql'),
  resolvers: require('./resolvers')
};
