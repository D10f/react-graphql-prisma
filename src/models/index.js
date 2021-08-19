const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

module.exports = {
  User: new User(prisma),
  Post: new Post(prisma),
  Comment: new Comment(prisma),
};
