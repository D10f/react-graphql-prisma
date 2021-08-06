const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

module.exports = req => ({
  user: new User(req, prisma),
  post: new Post(req, prisma),
  comment: new Comment(req, prisma),
});
