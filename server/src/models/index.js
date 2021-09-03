module.exports = prisma => ({
  UserModel: require('./UserModel')(prisma),
  PostModel: require('./PostModel')(prisma),
  CommentModel: require('./CommentModel')(prisma),
});
