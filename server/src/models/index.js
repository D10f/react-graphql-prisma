// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient({
//   log: ['query'],
// });

module.exports = prisma => ({
  UserModel: require('./UserModel')(prisma),
  PostModel: require('./PostModel')(prisma),
  CommentModel: require('./CommentModel')(prisma),
});
