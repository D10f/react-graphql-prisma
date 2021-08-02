module.exports = {
  Query: {
    async comments(parent, args, { prisma }, info) {
      return await prisma.comment.findMany();
    }
  },
  Comment: {
    async author(parent, args, { prisma }, info) {
      return await prisma.user.findUnique({ where: { id: parent.authorId }});
    },
    async post(parent, args, { prisma }, info) {
      return await prisma.post.findUnique({ where: { id: parent.postId }});
    }
  },
  Mutation: {
    async createComment(parent, { data }, { prisma }, info) {
      const author = await prisma.user.findUnique({ where: { id: Number(data.authorId) }});

      if (!author) {
        throw new Error('No user found with that id.');
      }

      const post = await prisma.post.findUnique({ where: { id: Number(data.postId) }});

      if (!post) {
        throw new Error('No post found with that id');
      }

      return await prisma.comment.create({ data: {
        text: data.text,
        authorId: Number(data.authorId),
        postId: Number(data.postId)
      }});
    },
    async deleteComment(parent, { id }, { prisma }, info) {
      const comment = await prisma.comment.findUnique({ where: { id: Number(id) }});

      if (!comment) {
        throw new Error('Cannot find any comments with that id.');
      }

      return await prisma.comment.delete({ where: { id: comment.id }});
    },
    async updateComment(parent, { id, data }, { prisma }, info){
      const comment = await prisma.comment.findUnique({ where: { id: Number(id) }});

      if (!comment) {
        throw new Error('Cannot find any comments with that id.');
      }

      const updates = {};

      // Verify none of the fields provided is null to avoid potential data corruption
      Object.entries(data).forEach(([ key, value]) => {
        if (value !== null) {
          updates[key] = value;
        }
      });

      return await prisma.comment.update({
        where: { id: comment.id },
        data: updates
      });
    },
  }
};
