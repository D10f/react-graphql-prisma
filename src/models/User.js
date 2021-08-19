const { UserInputError } = require('apollo-server');

class User {
  constructor(prisma) {
    this.db = prisma;
  }

  async findById(id) {
    return await this.db.user.findUnique({ where: { id }});
  }

  async findByEmail(email) {
    return await this.db.user.findUnique({ where: { email }});
  }

  async findOne(username) {
    return await this.db.user.findUnique({ where: { username }});
  }

  async findMany(query = '') {
    return query
      ? await this.db.user.findMany({ where: { username: query }})
      : await this.db.user.findMany()
  }

  async getLikedPosts(id) {
    const result = await this.db.user.findUnique({
      where: { id },
      select: { likes: true }
    });
    return result.likes;
  }

  async create(data) {
    return await this.db.user.create({ data });
  }

  async update(id, input) {
    try {
      return await this.db.user.update({
        where: { id },
        data: input
      });
    } catch (err) {
      // throw new UserInputError('No user found with that id.');
      throw new UserInputError(err.message);
    }
  }

  async delete(id) {
    // Retrieve user data, including all posts and comments
    const user = await this.db.user.findUnique({
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
    await this.db.$transaction([
      this.db.comment.deleteMany({ where: { id: { in: commentsByUser } }}),
      this.db.post.deleteMany({ where: { id: { in: postsByUser } }}),
      this.db.user.delete({ where: { id }})
    ]);

    return user;
  };
}

module.exports = User;
