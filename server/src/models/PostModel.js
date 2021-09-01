const { AuthenticationError, UserInputError, ForbiddenError } = require('apollo-server');

module.exports = prisma => ({

  async find(limit, skip) {
    return await prisma.post.findMany({
      where: { published: true },
      take: limit,
      skip
    });
  },

  async findById(id) {
    return await prisma.post.findUnique({ where: { id }});
  },

  async findByAuthorId(id) {
    return await prisma.post.findMany({ where: { authorId: id }});
  },

  async findLikedBy(id) {
    const result = await prisma.post.findUnique({
      where: { id },
      select: { likedBy: true }
    });
    return result.likedBy;
  },

  async likePost(postId, userId) {
    return await prisma.post.update({
      where: { id: postId },
      data: {
        likeCount: { increment: 1 },
        likedBy: {
          connect: {
            id: userId
          }
        },
      }
    });
  },

  async unlikePost (postId, userId) {
    return await prisma.post.update({
      where: { id: postId },
      data: {
        likeCount: { decrement: 1 },
        likedBy: {
          disconnect: {
            id: userId
          }
        },
      }
    });
  },

  async toggleLikeStatus(postId, userId) {
    const likesArray = await prisma.post.findUnique({
      where: { id: postId },
      select: {
        likedBy: {
          select: {
            id: true
          }
        }
      }
    });

    const match = likesArray.likedBy.find(user => user.id == userId);

    return match
      ? await this.unlikePost(postId, userId)
      : await this.likePost(postId, userId);
  },

  async create(input) {
    return await prisma.post.create({
      data: input
    });
  },

  async update(postId, input) {
    // const post = await this.findById(postId);
    //
    // if (!post) {
    //   throw new UserInputError('No post found for that id.');
    // }

    return await prisma.post.update({
      where: { id: postId },
      data: input
    });
  },

  async delete(postId) {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: { comments: true }
    });

    const commentIds = post.comments.map(comment => comment.id);

    await prisma.$transaction([
      prisma.comment.deleteMany({ where: { id: { in: commentIds }}}),
      prisma.post.delete({ where: { id: postId }})
    ]);

    return post;
  },
});
