const { AuthenticationError, UserInputError, ForbiddenError } = require('apollo-server');
const validators = require('../validators');

class Comment {
  constructor(prisma) {
    this.db = prisma;
  }

  async findById(id) {
    const comment = await this.db.comment.findUnique({ where: { id }});

    if (!comment) {
      throw new UserInputError('No comment found with that id.');
    }

    return comment;
  }

  async findByPostId(id) {
    const comment = await this.db.comment.findMany({ where: { postId: id }});

    if (!comment) {
      throw new UserInputError('No comment found with that id.');
    }

    return comment;
  }

  async findByAuthorId(id) {
    const comment = await this.db.comment.findMany({ where: { authorId: id }});

    if (!comment) {
      throw new UserInputError('No comment found with that id.');
    }

    return comment;
  }

  async findComments(query = '') {
    return query
      ? await this.db.comment.findMany({ where: { text: query }})
      : await this.db.comment.findMany()
  }

  async create({ text, postId, authorId }) {

    const [ comment ] = await this.db.$transaction([
      this.db.comment.create({
        data: {
          text,
          postId,
          authorId,
        }
      }),
      this.db.post.update({
        where: { id: postId },
        data: { commentCount: { increment: 1 }}
      })
    ]);

    return comment;
  };

  async update(id, input) {
    return await this.db.comment.update({
      where: { id },
      data: input
    });
  };

  async delete(id) {
    const comment = await this.findById(id);

    await this.db.$transaction([
      this.db.post.update({
        where: { id: comment.postId },
        data: { commentCount: { decrement: 1 }}
      }),
      this.db.comment.delete({ where: { id }}),
    ]);

    return comment;
  };
}

module.exports = Comment;
