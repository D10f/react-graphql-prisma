const { AuthenticationError, ForbiddenError } = require('apollo-server');
const sanitizeHtml = require('sanitize-html');
const validators = require('../validators');

// const { CommentModel } = require('../models');
const AuthService = require('./AuthService');

module.exports = ({ CommentModel, UserModel, PostModel }) => ({

  async findByAuthorId(authorId) {
    return await CommentModel.findByAuthorId(authorId);
  },

  async findByPostId(postId) {
    return await CommentModel.findByPostId(postId);
  },

  async findComments(query) {
    return await CommentModel.findComments(query);
  },

  async create(input, reqUser) {

    if (!AuthService.isAuthenticated(reqUser)) {
      throw new AuthenticationError('You must be logged in to perform this action.');
    }

    // Check if user has permission to comment on this post (because is blocked or post author doesnt allow comments)
    // if (! await AuthService.isAuthorized(reqUser, null, [ AuthService.isSameUser ])) {
      //   throw new ForbiddenError('You are not authorized to perform this action.');
      // }

    validators.validateCreateCommentInput(input);

    // Sanitize user input
    input.text = sanitizeHtml(input.text.trim());

    input.authorId = Number(reqUser.id);
    input.postId = Number(input.postId);

    const comment = await CommentModel.create(input);

    const post = await PostModel.findById(input.postId);

    // Do not notify users if they commented on their own posts
    if (post.authorId !== reqUser.id) {
      await UserModel.notify({
        receiverId: post.authorId,
        emitterId: reqUser.id,
        postId: post.id,
        commentId: comment.id,
        message: `${reqUser.username} has commented on one of your posts!`,
      });
    }

    return comment;
  },

  async update(commentId, input, reqUser) {
    validators.validateUpdateCommentInput(input);

    if (!AuthService.isAuthenticated(reqUser)) {
      throw new AuthenticationError('You must be logged in to perform this action.');
    }

    const { authorId } = await CommentModel.findById(commentId);

    if (!AuthService.isAuthorized(reqUser, authorId, [ AuthService.isAuthor, AuthService.isAdmin ])) {
      throw new ForbiddenError('You are not authorized to perform this action.');
    }

    return await CommentModel.update(commentId, input);
  },

  async delete(commentId, reqUser) {
    if (!AuthService.isAuthenticated(reqUser)) {
      throw new AuthenticationError('You must be logged in to perform this action.');
    }

    const { authorId } = await CommentModel.findById(commentId);

    if (!AuthService.isAuthorized(reqUser, authorId, [ AuthService.isAuthor, AuthService.isAdmin ])) {
      throw new ForbiddenError('You are not authorized to perform this action.');
    }

    return await CommentModel.delete(commentId);
  },
});
