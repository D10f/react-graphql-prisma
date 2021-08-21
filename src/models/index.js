const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  UserModel: require('./UserModel')(prisma),
  PostModel: require('./PostModel')(prisma),
  CommentModel: require('./CommentModel')(prisma),
};
