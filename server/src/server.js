const express = require('express');
const { ApolloServer } = require('apollo-server-express');
// const { ApolloServerPluginLandingPageGraphQLPlayground } = require("apollo-server-core");

const { typeDefs, resolvers } = require('./schema');
// const services = require('./services');

const app = express();

async function createApolloServer(services){
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      const userToken = req.get('authorization') && req.get('authorization').replace('Bearer ', '');
      const token = userToken && services.auth.verifyToken(userToken);
      const user = token && await services.user.findById(token.id);

      return { user, services };
    },
    plugins: [
      // ApolloServerPluginLandingPageGraphQLPlayground
    ]
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
  return apolloServer;
}

module.exports = { createApolloServer, app };
