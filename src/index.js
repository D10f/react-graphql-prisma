const { ApolloServer } = require('apollo-server');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require("apollo-server-core");
const { PrismaClient } = require('@prisma/client');
const { typeDefs, resolvers } = require('./schema');

const PORT = 5000;

const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    prisma
  },
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground
  ]
});

async function main() {
  const { url } = await server.listen({ port: PORT });
  console.log(`Server running on ${url}`);
}

main();
