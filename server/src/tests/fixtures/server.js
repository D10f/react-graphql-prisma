const { createTestClient } = require('apollo-server-integration-testing');

require('dotenv').config();

// Import the testing prisma client which uses a separate database
const { PrismaClient } = require('./db/client');
const { createApolloServer } = require('../../server');

const prisma = new PrismaClient();
const models = require('../../models')(prisma);
const services = require('../../services')(models);

// Mock data to populate the database before each test
const { users, posts, comments } = require('./data');

const setupServer = async () => {
  const apolloServer = await createApolloServer(services);
  return createTestClient({ apolloServer });
};

const setupDatabase = async () => {
  await prisma.$connect();

  await prisma.$transaction([
    prisma.user.create({
      data: {
        ...users[0],
        posts: { create: posts[0] }
      }
    }),

    prisma.user.create({
      data: {
        ...users[1],
        posts: { create: posts[1] }
      }
    }),

    prisma.user.create({
      data: {
        ...users[2],
        posts: { create: posts[2] }
      }
    }),
  ]);

  await prisma.$transaction([
    prisma.comment.create({
      data: comments[0]
    }),
    prisma.post.update({
      where: { id: comments[0].postId },
      data: { commentCount: { increment: 1 }}
    }),

    prisma.comment.create({
      data: comments[1]
    }),
    prisma.post.update({
      where: { id: comments[1].postId },
      data: { commentCount: { increment: 1 }}
    }),

    prisma.comment.create({
      data: comments[2]
    }),
    prisma.post.update({
      where: { id: comments[2].postId },
      data: { commentCount: { increment: 1 }}
    }),
  ]);
};

const teardownDatabase = async () => {
  await prisma.$transaction([
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
