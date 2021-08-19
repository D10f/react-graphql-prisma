const { AuthenticationError, ForbiddenError } = require('apollo-server');
const validators = require('../validators');

const { Post } = require('../models');
const AuthService = require('./AuthService');

module.exports = {

  async findPosts(query) {
    return await Post.find(query);
  },

  async findById(postId) {
    return await Post.findById(postId);
  },

  async findByAuthorId(authorId) {
    return await Post.findByAuthorId(authorId);
  },

  async findLikedBy(postId) {
    return await Post.findLikedBy(postId);
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

    input.authorId = reqUser.id;

    return await Post.create(input);
  },

  async update(postId, input, reqUser) {
    validators.validateUpdatePostInput(input);

    if (!AuthService.isAuthenticated(reqUser)) {
      throw new AuthenticationError('You must be logged in to perform this action.');
    }

    if (!AuthService.isAuthorized(reqUser, postId, [ AuthService.isSameUser, AuthService.isAdmin ])) {
      throw new ForbiddenError('You are not authorized to perform this action.');
    }

    return await Post.update(postId, input);
  },

  async delete(postId, reqUser) {
    if (!AuthService.isAuthenticated(reqUser)) {
      throw new AuthenticationError('You must be logged in to perform this action.');
    }

    // const post = await Post.findById(postId);

    if (!AuthService.isAuthorized(reqUser, postId, [ AuthService.isSameUser, AuthService.isAdmin ])) {
      throw new ForbiddenError('You are not authorized to perform this action.');
    }

    return await Post.delete(postId);
  },

  async toggleLikeStatus(postId, reqUser) {
    if (!AuthService.isAuthenticated(reqUser)) {
      throw new AuthenticationError('You must be logged in to perform this action.');
    }

    if (!AuthService.isAuthorized(reqUser, postId, [ AuthService.isSameUser, AuthService.isAdmin ])) {
      throw new ForbiddenError('You are not authorized to perform this action.');
    }

    return await Post.toggleLikeStatus(postId, reqUser.id);
  },
};
