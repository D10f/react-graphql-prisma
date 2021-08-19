const AuthService = require('./AuthService');
const UserService = require('./UserService');
const PostService = require('./PostService');
const CommentService = require('./CommentService');

module.exports = {
  auth: AuthService,
  user: UserService,
  post: PostService,
  comment: CommentService,
};
