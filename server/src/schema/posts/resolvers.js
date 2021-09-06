module.exports = {
  Query: {
    // DEPRECATED: Returns an array of 10 posts
    async posts(parent, { query }, { user, services }, info) {
      return await services.post.findPosts(10);
    },
    async getPostDetails(parent, { id }, { user, services }, info) {
      return await services.post.findById(Number(id));
    },
    // Returns an array of posts meant to be used in the public landing page feed
    async postsForPublicFeed(parent, { limit, skip }, { user, services}) {
      return await services.post.findPosts(limit, skip, user);
    },
    // Returns an array of filtered posts that an authenticated user has given a like
    async postsForFavoriteFeed(parent, { limit, skip }, { user, services }) {
      return await services.user.getLikedPosts(limit, skip, user);
    },
    // Returns an array of posts
    async postsForDashboardFeed(parent, { limit, skip }, { user, services }) {
      return await services.user.getUserPosts(limit, skip, user);
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
