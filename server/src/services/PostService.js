const { AuthenticationError, ForbiddenError } = require('apollo-server');
const validators = require('../validators');

const AuthService = require('./AuthService');

module.exports = ({ PostModel }) => ({

  async findPosts(limit = 10, skip = 0) {
    return await PostModel.find(limit, skip);
  },

  async findById(postId) {
    return await PostModel.findById(postId);
  },

  async findByAuthorId(authorId) {
    return await PostModel.findByAuthorId(authorId);
  },

  async findLikedBy(postId) {
    return await PostModel.findLikedBy(postId);
  },

  async create(input, reqUser) {
    validators.validateCreatePostInput(input);

    if (!AuthService.isAuthenticated(reqUser)) {
      throw new AuthenticationError('You must be logged in to perform this action.');
    }

    // Check if user has write permission to create posts
    // if (!AuthService.isSameUser(reqUser)) {
    //   throw new ForbiddenError('You are not authorized to perform this action.');
    // }

    // Create a short excerpt if there isn't one
    if (!input.excerpt) {
      newExcerpt = input.body.slice(0, 60);
      input.excerpt = newExcerpt.padEnd(newExcerpt.length + 3, '.');
    }

    input.authorId = reqUser.id;

    return await PostModel.create(input);
  },

  async update(postId, input, reqUser) {
    validators.validateUpdatePostInput(input);

    // if (!AuthService.isAuthenticated(reqUser)) {
    //   throw new AuthenticationError('You must be logged in to perform this action.');
    // }

    if (!AuthService.isAuthorized(reqUser, postId, [ AuthService.isAuthor, AuthService.isAdmin ])) {
      throw new ForbiddenError('You are not authorized to perform this action.');
    }

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
