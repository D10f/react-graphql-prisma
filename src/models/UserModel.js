const { UserInputError } = require('apollo-server');

module.exports = prisma => ({

  async findById(id) {
    return await prisma.user.findUnique({ where: { id }});
  },

  async findByEmail(email) {
    return await prisma.user.findUnique({ where: { email }});
  },

  async findOne(username) {
    return await prisma.user.findUnique({ where: { username }});
  },

  async findMany(query = '') {
    return query
      ? await prisma.user.findMany({ where: { username: query }})
      : await prisma.user.findMany()
  },

  async getUserPosts(userId) {
    return await this.findById(userId).posts();
  },

  async getUserComments(userId) {
    return await this.findById(userId).comments();
  },

  async getLikedPosts(id) {
    const result = await prisma.user.findUnique({
      where: { id },
      select: { likes: true }
    });
    return result.likes;
  },

  async create(data) {
    return await prisma.user.create({ data });
  },

  async update(id, input) {
    try {
      return await prisma.user.update({
        where: { id },
        data: input
      });
    } catch (err) {
      // throw new UserInputError('No user found with that id.');
      throw new UserInputError(err.message);
    }
  },

  async delete(id) {
    // Retrieve user data, including all posts and comments
    const user = await prisma.user.findUnique({
      where: { id },
      include: { posts: true, comments: true }
    });

    if (!user) {
      throw new UserInputError('No user found with that id.');
    }

    // Get all Ids of posts and comments by that user
    const postsByUser = user.posts.map(post => post.id);
    const commentsByUser = user.comments.map(comment => comment.id);

    // Delete comments, posts and user in a single transaction due to closely coupled data
    await prisma.$transaction([
      prisma.comment.deleteMany({ where: { id: { in: commentsByUser } }}),
      prisma.post.deleteMany({ where: { id: { in: postsByUser } }}),
      prisma.user.delete({ where: { id }})
    ]);

    return user;
  },
});
