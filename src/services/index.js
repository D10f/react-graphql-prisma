module.exports = models => ({
  auth: require('./AuthService'),
  user: require('./UserService')(models),
  post: require('./PostService')(models),
  comment: require('./CommentService')(models),
});
