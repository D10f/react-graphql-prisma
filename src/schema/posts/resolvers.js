module.exports = {
  Query: {
    async posts(parent, { query }, { models }, info) {
      return await models.post.findPosts(query);
    },
  },
  Post: {
    async author({ authorId }, args, { models }, info) {
      return await models.user.findById(authorId);
    },
    async comments({ id }, args, { models }, info) {
      return await models.comment.findByPostId(id);
    },
    async likedBy({ id }, args, { models }, info) {
      return await models.post.getLikedBy(id);
    }
  },
  Mutation: {
    async createPost(parent, { input }, { models }, info) {
      return await models.post.createPost({ ...input, authorId: Number(input.authorId) });
    },
    async updatePost(parent, { id, input }, { models }, info) {
      return await models.post.updatePost(Number(id), input);
    },
    async deletePost(parent, { id }, { models }, info) {
      return await models.post.deletePost(Number(id));
    },
    async likeOrUnlikePost(parent, { postId, userId }, { models }, info) {
      return await models.post.likeOrUnlikePost(Number(postId), Number(userId));
    },
  }
};
