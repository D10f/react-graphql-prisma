module.exports = {
  Query: {
    async posts(parent, { query }, { user, services }, info) {
      return await services.post.findPosts(query);
    },
  },
  Post: {
    async author({ authorId }, args, { user, services }, info) {
      return await services.user.findById(authorId);
    },
    async comments({ id }, args, { user, services }, info) {
      return await services.comment.findByPostId(id);
    },
    async likedBy({ id }, args, { user, services }, info) {
      return await services.post.findLikedBy(id);
    }
  },
  Mutation: {
    async createPost(parent, { input }, { user, services }, info) {
      // return await services.post.create({ ...input, authorId: Number(input.authorId) }, user);
      return await services.post.create(input, user);
    },
    async updatePost(parent, { id, input }, { user, services }, info) {
      return await services.post.update(Number(id), input, user);
    },
    async deletePost(parent, { id }, { user, services }, info) {
      return await services.post.delete(Number(id), user);
    },
    async likeOrUnlikePost(parent, { postId }, { user, services }, info) {
      return await services.post.toggleLikeStatus(Number(postId), user);
    },
  }
};
