const path = require('path');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { graphqlUploadExpress } = require('graphql-upload');

const { typeDefs, resolvers } = require('./schema');
const app = express();

/* !!!!! REMOVE AFTER TESTING !!!!!*/
const delay = (timeInMs) => new Promise(resolve => {
  setTimeout(resolve, timeInMs);
});

async function createApolloServer(services){
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      const userToken = req.get('authorization') && req.get('authorization').replace('Bearer ', '');
      const token = userToken && services.auth.verifyToken(userToken);
      const user = token && await services.user.findById(token.id);

      /* !!!!! REMOVE AFTER TESTING !!!!!*/
      // await delay(1500);

      return { user, services };
    },
    formatError: (err) => {
      // Send a friendlier message in case of file size exceeded
      if (err.message.startsWith('File truncated')) {
        err.message = 'File truncated as it exceeds the 1MB size limit.'
      }

      // Prevent leaking database errors
      if (err.message.includes('prisma')) {
        err.message = 'Internal Server Error, please try again later.'
      }

      return err;
    }
  });

  await apolloServer.start();

  // app.use(express.static(path.resolve(__dirname, 'public')));
  app.use(express.static('public'));
  app.use(graphqlUploadExpress({ maxFileSize: 1024 * 1024, maxFiles: 1 }));
  apolloServer.applyMiddleware({ app });

  return apolloServer;
}

module.exports = { createApolloServer, app };
