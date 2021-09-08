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

  async getUserNotifications(userId) {
    return await prisma.user.findUnique({ where: { id: userId }}).notifications();
  },

  async notify({ receiverId, emitterId, postId, commentId, message }){
    return await prisma.notification.create({
      data: {
        emitterId,
        postId,
        commentId,
        message,
        receiver: {
          connect: { id: receiverId }
        }
      }
    });
  },

  async getUserPosts(userId, limit, skip) {
    const result = await prisma.user.findUnique({
      where: { id: userId },
    }).posts();

    return result.slice(skip, limit);
  },

  async getUserComments(userId) {
    return await prisma.user.findUnique({ where: { id: userId }}).comments();
  },

  async getLikedPosts(userId, limit, skip) {
    const result = await prisma.user.findUnique({
      where: { id: userId },
      select: { likes: true }
    });
    // return result.likes;
    return result.likes.slice(skip, limit);
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

  // Deletes the user and triggers a cascade to also delete all associated posts and comments.
  async delete(id) {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        posts: true,
        comments: true
      }
    });

    if (!user) {
      throw new UserInputError('No user found with that id.');
    }

    // Get all Ids of posts and comments by that user
    const postsByUser = user.posts.map(post => post.id);
    const commentsByUser = user.comments.map(comment => comment.id);

    // Get all Ids of nested comments included in posts about to be deleted
    const otherNestedComments = await prisma.post.findMany({
      where: { id: { in: postsByUser }},
      include: { comments: true }
    });

    const otherCommentsToBeDeleted = [];

    for (const post of otherNestedComments) {
      for (const comment of post.comments) {
        otherCommentsToBeDeleted.push(comment.id);
      }
    }

    // Delete comments, posts and user in a single transaction due to closely coupled data
    await prisma.$transaction([
      prisma.comment.deleteMany({ where: { id: { in: [ ...commentsByUser, ...otherCommentsToBeDeleted] } }}),
      prisma.post.deleteMany({ where: { id: { in: postsByUser } }}),
      prisma.user.delete({ where: { id }})
    ]);

    return user;
  },
});
