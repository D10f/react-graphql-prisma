const { ApolloServer } = require('apollo-server');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require("apollo-server-core");

require('dotenv').config();

const { typeDefs, resolvers } = require('./schema');
const generateModels = require('./models');
const authenticate = require('./helpers/authenticate');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    authenticate(req);
    return {
      models: generateModels(req)
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
