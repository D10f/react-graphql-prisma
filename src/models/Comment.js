const { AuthenticationError, UserInputError, ForbiddenError } = require('apollo-server');
const validators = require('../validators');

class Comment {
  constructor(req, prisma) {
    this.user = req.user;
    this.db = prisma;
  }

  async findById(id) {
    return await this.db.comment.findUnique({ where: { id }});
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
      throw new AuthenticationError('You must be logged in to perform this action.');
    }

    if (this.user.id !== Number(authorId)) {
      throw new ForbiddenError('You are not authorized to perform this action.');
    }

    validators.validateCreateCommentInput({ text, authorId, postId });

    authorId = Number(authorId);
    postId = Number(postId);

    // const author = await this.db.user.findUnique({ where: { id: authorId }});
    //
    // if (!author) {
    //   throw new UserInputError('No user found with that id.');
    // }

    const post = await this.db.post.findUnique({ where: { id: postId }});

    if (!post) {
      throw new UserInputError('No post found with that id');
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
      throw new AuthenticationError('You must be logged in to perform this action.');
    }

    if (this.user.id !== Number(input.authorId) && this.user.role !== 'ADMIN') {
      throw new ForbiddenError('You are not authorized to perform this action.');
    }

    validators.validateUpdateCommentInput(input);

    const comment = await this.findById(id);

    if (!comment) {
      throw new UserInputError('Cannot find any comments with that id.');
    }

    return await this.db.comment.update({
      where: { id },
      data: input
    });
  };

  async deleteComment(id) {
    if (!this.user) {
      throw new AuthenticationError('You must be logged in to perform this action.');
    }

    const comment = await this.db.comment.findUnique({ where: { id }});

    if (!comment) {
      throw new UserInputError('Cannot find any comments with that id.');
    }

    if (this.user.id !== comment.id && this.user.role !== 'ADMIN') {
      throw new ForbiddenError('You are not authorized to perform this action.');
    }

    return await this.db.comment.delete({ where: { id }});
  };
}

module.exports = Comment;
