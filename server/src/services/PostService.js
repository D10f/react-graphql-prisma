const { AuthenticationError, ForbiddenError } = require('apollo-server');
const sanitizeHtml = require('sanitize-html');
const validators = require('../validators');
const AuthService = require('./AuthService');

const MAX_EXCERPT_LENGTH = 120;

module.exports = ({ PostModel }) => ({

  async findPosts(limit = 10, skip = 0, reqUser) {

    // As admin, return both public and private posts
    if (reqUser && AuthService.isAuthorized(reqUser, null, AuthService.isAdmin)) {
      return await PostModel.findAll(limit, skip);
    }

    return await PostModel.find(limit, skip);
  },

  async findById(postId) {
    return await PostModel.findById(postId);
  },

  async findByAuthorId(authorId, limit = 10, skip = 0) {
    return await PostModel.findByAuthorId(authorId);
  },

  async findLikedBy(postId) {
    return await PostModel.findLikedBy(postId);
  },

  async create(input, reqUser) {

    if (!AuthService.isAuthenticated(reqUser)) {
      throw new AuthenticationError('You must be logged in to perform this action.');
    }

    validators.validateCreatePostInput(input);

    // Create a short excerpt if there isn't one
    if (!input.excerpt) {
      newExcerpt = input.body.slice(0, MAX_EXCERPT_LENGTH);
      // input.excerpt = newExcerpt.padEnd(newExcerpt.length + 3, '.');
      input.excerpt = newExcerpt.length <= input.body.length
        ? newExcerpt.padEnd(newExcerpt.length + 3, '.')
        : input.body;
    }

    // Sanitize user input
    input.title = sanitizeHtml(input.title.trim());
    input.body = sanitizeHtml(input.body.trim());
    input.excerpt = sanitizeHtml(input.excerpt.trim());

    input.authorId = reqUser.id;

    return await PostModel.create(input);
  },

  async update(postId, input, reqUser) {

    const post = await PostModel.findById(postId);

    if (!AuthService.isAuthorized(reqUser, post.authorId, [ AuthService.isAuthor, AuthService.isAdmin ])) {
      throw new ForbiddenError('You are not authorized to perform this action.');
    }

    validators.validateUpdatePostInput(input);

    input.title = sanitizeHtml(input.title.trim());
    input.body = sanitizeHtml(input.body.trim());
    input.excerpt = sanitizeHtml(input.excerpt.trim());

    return await PostModel.update(postId, input);
  },

  async delete(postId, reqUser) {
    if (!AuthService.isAuthenticated(reqUser)) {
      throw new AuthenticationError('You must be logged in to perform this action.');
    }

    // const post = await PostModel.findById(postId);

    if (!AuthService.isAuthorized(reqUser, postId, [ AuthService.isAuthor, AuthService.isAdmin ])) {
      throw new ForbiddenError('You are not authorized to perform this action.');
    }

    return await PostModel.delete(postId);
  },

  async toggleLikeStatus(postId, reqUser) {
    if (!AuthService.isAuthenticated(reqUser)) {
      throw new AuthenticationError('You must be logged in to perform this action.');
    }

    // if (!AuthService.isAuthorized(reqUser, postId, [ AuthService.isAuthor, AuthService.isAdmin ])) {
    //   throw new ForbiddenError('You are not authorized to perform this action.');
    // }

    return await PostModel.toggleLikeStatus(postId, reqUser.id);
  },
});
