module.exports = {
  Query: {
    async users(parent, { query }, { models }, info) {
      return await models.user.findUsers(query);
    },
  },
  User: {
    async posts({ id }, args, { models }, info) {
      return await models.post.findByAuthorId(id);
    },
    async comments({ id }, args, { models }, info) {
      return await models.comment.findByAuthorId(id);
    },
    async likes({ id }, args, { models }, info) {
      return await models.user.getLikedPosts(id);
    }
  },
  Mutation: {
    async registerUser(parent, { input }, { models }, info) {
      return await models.user.registerUser(input);
    },
    async loginUser(parent, { username, password }, { models }, info) {
      return await models.user.loginUser(username, password);
    },
    async updateUser(parent, { id, input }, { models }, info) {
      return await models.user.updateUser(Number(id), input);
    },
    async deleteUser(parent, { id }, { models }, info) {
      return await models.user.deleteUser(Number(id));
    },
  }
};
