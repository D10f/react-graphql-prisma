const { UserInputError } = require('apollo-server');

module.exports = prisma => ({

  async findById(id) {
    const comment = await prisma.comment.findUnique({ where: { id }});

    if (!comment) {
      throw new UserInputError('No comment found with that id.');
    }

    return comment;
  },

  async findByPostId(id) {
    const comment = await prisma.comment.findMany({ where: { postId: id }});

    if (!comment) {
      throw new UserInputError('No comment found with that id.');
    }

    return comment;
  },

  async findByAuthorId(id) {
    const comment = await prisma.comment.findMany({ where: { authorId: id }});

    if (!comment) {
      throw new UserInputError('No comment found with that id.');
    }

    return comment;
  },

  async findComments(query = '') {
    return query
      ? await prisma.comment.findMany({ where: { text: query }})
      : await prisma.comment.findMany()
  },

  async create({ text, postId, authorId }) {

    const [ comment ] = await prisma.$transaction([
      prisma.comment.create({
        data: {
          text,
          postId,
          authorId,
        }
      }),
      prisma.post.update({
        where: { id: postId },
        data: { commentCount: { increment: 1 }}
      })
    ]);

    return comment;
  },

  async update(id, input) {
    return await prisma.comment.update({
      where: { id },
      data: input
    });
  },

  async delete(id) {
    const comment = await this.findById(id);

    await prisma.$transaction([
      prisma.post.update({
        where: { id: comment.postId },
        data: { commentCount: { decrement: 1 }}
      }),
      prisma.comment.delete({ where: { id }}),
    ]);

    return comment;
  },
});
