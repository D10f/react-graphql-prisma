const validators = require('../validators');

class Post {
  constructor(req, prisma) {
    this.user = req.user;
    this.db = prisma;
  }

  async findById(id) {
    return await this.db.post.findUnique({ where: { id }});
  }

  async findByAuthorId(id) {
    return await this.db.post.findMany({ where: { authorId: id }});
  }

  async findPosts(query = '') {
    return query
      ? await this.db.post.findMany({ where: { title: query }})
      : await this.db.post.findMany()
  }

  async getLikedBy(id) {
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

  async likeOrUnlikePost (postId, userId) {
    if (!this.user) {
      throw new Error('You are not authorized');
    }

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

  async createPost(input) {
    if (!this.user) {
      throw new Error('You are not authorized');
    }

    validators.validateCreatePostInput(input);

    const userExists = await this.db.user.findUnique({ where: { id: Number(input.authorId) }});
    if (!userExists) {
      throw new Error('No user found with that id.');
    }
    return await this.db.post.create({ data: { ...input, authorId: Number(input.authorId) }});
  };

  async updatePost(postId, input) {
    if (!this.user) {
      throw new Error('You are not authorized');
    }

    validators.validateUpdatePostInput(input);

    const post = await this.db.post.findUnique({ where: { id: postId }});

    if (!post) {
      throw new Error('No post found for that id.');
    }

    if (input['authorId']) {
      input.authorId = Number(input.authorId);
    }

    return await this.db.post.update({
      where: { id: postId },
      data: input
    });
  };

  async deletePost(postId) {
    if (!this.user) {
      throw new Error('You are not authorized');
    }

    const post = await this.db.post.findUnique({
      where: { id: postId },
      include: { comments: true }
    });

    if (!post) {
      throw new Error('No post found with that id.');
    }

    const commentIds = post.comments.map(comment => comment.id);

    await this.db.$transaction([
      this.db.comment.deleteMany({ where: { id: { in: commentIds }}}),
      this.db.post.delete({ where: { id: postId }})
    ]);

    return post;
  };
}

module.exports = Post;
