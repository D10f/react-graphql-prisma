const { createTestClient } = require('apollo-server-integration-testing');

require('dotenv').config();

// Import the testing prisma client which uses a separate database
const { PrismaClient } = require('./db/client');
const { createApolloServer } = require('../../server');

const prisma = new PrismaClient();
const models = require('../../models')(prisma);
const services = require('../../services')(models);

// Mock data to populate the database before each test
const { seedDatabase } = require('./seedData');

const setupServer = async () => {
  const apolloServer = await createApolloServer(services);
  return createTestClient({ apolloServer });
};

const setupDatabase = async () => {
  await prisma.$connect();
  await seedDatabase(prisma);
};

const teardownDatabase = async () => {
  await prisma.$transaction([
    prisma.notification.deleteMany(),
    prisma.comment.deleteMany(),
    prisma.post.deleteMany(),
    prisma.user.deleteMany()
  ]);

  await prisma.$disconnect();
};

module.exports = {
  setupServer,
  setupDatabase,
  teardownDatabase
};
