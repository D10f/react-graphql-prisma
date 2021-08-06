module.exports = {
  Query: {
    async comments(parent, args, { models }, info) {
      return await models.comment.findComments();
    }
  },
  Comment: {
    async author({ authorId }, args, { models }, info) {
      return await models.user.findById(authorId);
    },
    async post({ postId }, args, { models }, info) {
      return await models.post.findById(postId);
    }
  },
  Mutation: {
    async createComment(parent, { input }, { models }, info) {
      return await models.comment.createComment(input);
    },
    async updateComment(parent, { id, input }, { models }, info){
      return await models.comment.updateComment(Number(id), input);
    },
    async deleteComment(parent, { id }, { models }, info) {
      return await models.comment.deleteComment(Number(id))
    },
  }
};
