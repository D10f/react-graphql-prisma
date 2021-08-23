// const AuthService = require('./AuthService');
// const UserService = require('./UserService');
// const PostService = require('./PostService');
// const CommentService = require('./CommentService');

module.exports = models => ({
  auth: require('./AuthService'),
  user: require('./UserService')(models),
  post: require('./PostService')(models),
  comment: require('./CommentService')(models),
});

// module.exports = {
//   auth: AuthService,
//   user: UserService,
//   post: PostService,
//   comment: CommentService,
// };
