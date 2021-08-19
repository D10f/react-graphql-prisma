const { AuthenticationError, ForbiddenError } = require('apollo-server');
const validators = require('../validators');

const { Comment } = require('../models');
const AuthService = require('./AuthService');

module.exports = {

  async findByAuthorId(authorId) {
    return await Comment.findByAuthorId(authorId);
  },

  async findByPostId(postId) {
    return await Comment.findByPostId(postId);
  },

  async findComments(query) {
    return await Comment.findComments(query);
  },

  async create(input, reqUser) {
    validators.validateCreateCommentInput(input);

    if (!AuthService.isAuthenticated(reqUser)) {
      throw new AuthenticationError('You must be logged in to perform this action.');
    }

    // Check if user has permission to comment on this post (because is blocked or post author doesnt allow comments)
    // if (! await AuthService.isAuthorized(reqUser, null, [ AuthService.isSameUser ])) {
    //   throw new ForbiddenError('You are not authorized to perform this action.');
    // }

    input.authorId = Number(reqUser.id);
    input.postId = Number(input.postId);

    return await Comment.create(input);
  },

  async update(commentId, input, reqUser) {
    validators.validateUpdateCommentInput(input);

    if (!AuthService.isAuthenticated(reqUser)) {
      throw new AuthenticationError('You must be logged in to perform this action.');
    }

    const { authorId } = await Comment.findById(commentId);

    if (!AuthService.isAuthorized(reqUser, authorId, [ AuthService.isAuthor, AuthService.isAdmin ])) {
      throw new ForbiddenError('You are not authorized to perform this action.');
    }

    return await Comment.update(commentId, input);
  },

  async delete(commentId, reqUser) {
    if (!AuthService.isAuthenticated(reqUser)) {
      throw new AuthenticationError('You must be logged in to perform this action.');
    }

    const { authorId } = await Comment.findById(commentId);

    if (!AuthService.isAuthorized(reqUser, authorId, [ AuthService.isAuthor, AuthService.isAdmin ])) {
      throw new ForbiddenError('You are not authorized to perform this action.');
    }

    return await Comment.delete(commentId);
  },
};
