const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

module.exports = (req, prisma) => ({
  user: new User(req, prisma),
  post: new Post(req, prisma),
  comment: new Comment(req, prisma),
});
