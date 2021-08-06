const validators = require('../validators');

class Comment {
  constructor(req, prisma) {
    this.user = req.user;
    this.db = prisma;
  }

  async findByPostId(id) {
    return await this.db.comment.findMany({ where: { postId: id }});
  }

  async findByAuthorId(id) {
    return await this.db.comment.findMany({ where: { authorId: id }});
  }

  async findComments(query = '') {
    return query
      ? await this.db.comment.findMany({ where: { text: query }})
      : await this.db.comment.findMany()
  }

  async createComment({ text, authorId, postId }) {
    if (!this.user) {
      throw new Error('You are not authorized');
    }

    validators.validateCreateCommentInput({ text, authorId, postId });

    authorId = Number(authorId);
    postId = Number(postId);

    const author = await this.db.user.findUnique({ where: { id: authorId }});

    if (!author) {
      throw new Error('No user found with that id.');
    }

    const post = await this.db.post.findUnique({ where: { id: postId }});

    if (!post) {
      throw new Error('No post found with that id');
    }

    return await this.db.comment.create({
      data: {
        text,
        authorId,
        postId
      }
    });
  };

  async updateComment(id, input) {
    if (!this.user) {
      throw new Error('You are not authorized');
    }

    validators.validateUpdateCommentInput(input);

    const comment = await this.db.comment.findUnique({ where: { id }});

    if (!comment) {
      throw new Error('Cannot find any comments with that id.');
    }

    return await this.db.comment.update({
      where: { id },
      data: input
    });
  };

  async deleteComment(id) {
    if (!this.user) {
      throw new Error('You are not authorized');
    }

    const comment = await this.db.comment.findUnique({ where: { id }});

    if (!comment) {
      throw new Error('Cannot find any comments with that id.');
    }

    return await this.db.comment.delete({ where: { id }});
  };
}

module.exports = Comment;
