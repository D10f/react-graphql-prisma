const { AuthenticationError, UserInputError, ForbiddenError } = require('apollo-server');

class Post {
  constructor(prisma) {
    this.db = prisma;
  }

  async findById(id) {
    return await this.db.post.findUnique({ where: { id }});
  }

  async findByAuthorId(id) {
    return await this.db.post.findMany({ where: { authorId: id }});
  }

  async find(query = '') {
    return query
      ? await this.db.post.findMany({ where: { title: query }})
      : await this.db.post.findMany();
  }

  async findLikedBy(id) {
    const result = await this.db.post.findUnique({
      where: { id },
      select: { likedBy: true }
    });
    return result.likedBy;
  }

  async likePost(postId, userId) {
    return await this.db.post.update({
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
  };

  async unlikePost (postId, userId) {
    return await this.db.post.update({
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
  };

  async toggleLikeStatus(postId, userId) {
    const likesArray = await this.db.post.findUnique({
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
  };

  async create(input) {
    return await this.db.post.create({
      data: input
    });
  };

  async update(postId, input) {
    // const post = await this.findById(postId);
    //
    // if (!post) {
    //   throw new UserInputError('No post found for that id.');
    // }

    return await this.db.post.update({
      where: { id: postId },
      data: input
    });
  };

  async delete(postId) {
    const post = await this.db.post.findUnique({
      where: { id: postId },
      include: { comments: true }
    });

    const commentIds = post.comments.map(comment => comment.id);

    await this.db.$transaction([
      this.db.comment.deleteMany({ where: { id: { in: commentIds }}}),
      this.db.post.delete({ where: { id: postId }})
    ]);

    return post;
  };
}

module.exports = Post;
