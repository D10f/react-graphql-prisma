require('dotenv').config();

const { PrismaClient } = require('@prisma/client');
const { createApolloServer, app } = require('./server');

const prisma = new PrismaClient(/* { log: ['query'] } */);

// For testing purposes we want to have two separate prisma clients, and pass them to the models
// (acting as the data layer). This creates an chain of dependency that spreads to the services,
// and then the main server startup function, which uses services on every incoming request to
// determine the GraphQL context.
// prisma -> models -> services -> server
const models = require('./models')(prisma);
const services = require('./services')(models);

const port = process.env.PORT || 5000;

async function main(services){
  const apolloServer = await createApolloServer(services);
  await app.listen(port);
  console.log(`Server running on http://localhost:${port}${apolloServer.graphqlPath}`);
}

main(services);
