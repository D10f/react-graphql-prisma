module.exports = models => ({
  auth: require('./AuthService'),
  file: require('./FileUploadService')(models),
  user: require('./UserService')(models),
  post: require('./PostService')(models),
  comment: require('./CommentService')(models),
});
