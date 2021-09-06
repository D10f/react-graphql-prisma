module.exports = {
  Query: {
    async users(parent, { query }, { user, services }, info) {
      return await services.user.findUsers(query);
    },
    // Retrieves a single profile by user id
    async getUserProfile(parent, { id }, { user, services }) {
      return await services.user.findById(Number(id), user);
    }
  },
  User: {
    async posts({ id }, args, { user, services }, info) {
      return await services.user.getUserPosts(id);
    },
    async comments({ id }, args, { user, services }, info) {
      return await services.comment.findByAuthorId(id);
    },
    async likes({ id }, args, { user, services }, info) {
      return await services.user.getLikedPosts(Number(id), user);
    }
  },
  Mutation: {
    async registerUser(parent, { input }, { user, services }, info) {
      return await services.user.signup(input);
    },
    async loginUser(parent, { username, password }, { user, services }, info) {
      return await services.user.login(username, password);
    },
    async updateUser(parent, { id, input }, { user, services }, info) {
      return await services.user.update(Number(id), input, user);
    },
    async deleteUser(parent, { id }, { user, services }, info) {
      return await services.user.delete(Number(id), user);
    },
  }
};
