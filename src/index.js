const { ApolloServer } = require('apollo-server');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require("apollo-server-core");

require('dotenv').config();

const { typeDefs, resolvers } = require('./schema');
const services = require('./services');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const userToken = req.get('authorization') && req.get('authorization').replace('Bearer ', '');
    const token = userToken && services.auth.verifyToken(userToken);
    const user = token && await services.user.findById(token.id);

    return { user, services };
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
