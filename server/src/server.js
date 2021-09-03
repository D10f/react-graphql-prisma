const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { graphqlUploadExpress } = require('graphql-upload');
// const { ApolloServerPluginLandingPageGraphQLPlayground } = require("apollo-server-core");

const { typeDefs, resolvers } = require('./schema');
// const services = require('./services');

/* !!!!! REMOVE AFTER TESTING !!!!!*/
const delay = (timeInMs) => new Promise(resolve => {
  setTimeout(resolve, timeInMs);
});

const app = express();

async function createApolloServer(services){
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      const userToken = req.get('authorization') && req.get('authorization').replace('Bearer ', '');
      const token = userToken && services.auth.verifyToken(userToken);
      const user = token && await services.user.findById(token.id);

      await delay(1500);
      return { user, services };
    },
    formatError: (err) => {
      if (err.message.startsWith('Database Error: ')) {
        return new Error('Internal server error');
      }

      if (err.message.startsWith('File truncated')) {
        err.message = 'File truncated as it exceeds the 1MB size limit.'
      }

      return err;
    },
    plugins: [
      // ApolloServerPluginLandingPageGraphQLPlayground
    ]
  });

  await apolloServer.start();

  app.use(graphqlUploadExpress({ maxFileSize: 1024 * 1024, maxFiles: 1 }));
  apolloServer.applyMiddleware({ app });

  return apolloServer;
}

module.exports = { createApolloServer, app };
