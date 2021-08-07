const { ApolloServer } = require('apollo-server');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require("apollo-server-core");
const { PrismaClient } = require('@prisma/client');

require('dotenv').config();

const { typeDefs, resolvers } = require('./schema');
const generateModels = require('./models');
const authenticate = require('./helpers/authenticate');

const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    await authenticate(req, prisma);
    return {
      models: generateModels(req, prisma)
    }
  },
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground
  ]
});

async function main() {
  const { url } = await server.listen({ port: process.env.PORT || 5000 });
  console.log(`Server running on ${url}`);
}

main();
