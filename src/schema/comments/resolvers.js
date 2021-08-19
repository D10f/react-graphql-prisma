module.exports = {
  Query: {
    async comments(parent, args, { user, services }, info) {
      return await services.comment.findComments();
    }
  },
  Comment: {
    async author({ authorId }, args, { user, services }, info) {
      return await services.user.findById(authorId);
    },
    async post({ postId }, args, { user, services }, info) {
      return await services.post.findById(postId);
    }
  },
  Mutation: {
    async createComment(parent, { input }, { user, services }, info) {
      return await services.comment.create(input, user);
    },
    async updateComment(parent, { id, input }, { user, services }, info){
      return await services.comment.update(Number(id), input, user);
    },
    async deleteComment(parent, { id }, { user, services }, info) {
      return await services.comment.delete(Number(id), user)
    },
  }
};
