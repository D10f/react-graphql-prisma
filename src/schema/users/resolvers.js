module.exports = {
  Query: {
    async users(parent, { query }, { user, services }, info) {
      return await services.user.findUsers(query);
    },
  },
  User: {
    async posts({ id }, args, { user, services }, info) {
      // return await services.post.findByAuthorId(id);
      return await services.user.getUserPosts(id);
    },
    async comments({ id }, args, { user, services }, info) {
      return await services.comment.findByAuthorId(id);
    },
    async likes({ id }, args, { user, services }, info) {
      return await services.user.getUserLikes(id);
    }
  },
  Mutation: {
    async registerUser(parent, { input }, { user, services }, info) {
      return await services.user.signup(input);
    },
    async loginUser(parent, { username, password }, { user, services }, info) {
      return await services.user.login(username, password);
    },
    async updateUser(parent, { targetUserId, input }, { user, services }, info) {
      return await services.user.update(Number(targetUserId), input, user);
    },
    async deleteUser(parent, { id }, { user, services }, info) {
      return await services.user.delete(id);
    },
  }
};
