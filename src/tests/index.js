const { ApolloServer } = require('apollo-server');

const { typeDefs, resolvers } = require('../schema');
const services = require('../services');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    user: null,
    services
  }
});

module.exports = {
  server,
  services
};
