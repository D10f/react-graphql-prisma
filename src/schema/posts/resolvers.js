module.exports = {
  Query: {
    async posts(parent, args, { prisma }, info) {
      const query = args.query ? args.query.toLowerCase() : undefined;
      return query
        ? await prisma.post.findMany({ where: { title: query }})
        : await prisma.post.findMany()
    },
  },
  Post: {
    async author(parent, args, { prisma }, info) {
      return await prisma.user.findUnique({ where: { id: parent.authorId }});
    },
    async comments(parent, args, { prisma }, info) {
      return await prisma.comment.findMany({ where: { postId: parent.id }});
    }
  },
  Mutation: {
    async createPost(parent, { data }, { prisma }, info) {
      const userExists = await prisma.user.findUnique({ where: { id: Number(data.authorId) }});

      if (!userExists) {
        throw new Error('No user found with that id.');
      }

      return await prisma.post.create({ data: { ...data, authorId: Number(data.authorId) }});
    },
    async deletePost(parent, { id }, { prisma }, info) {
      const post = await prisma.post.findUnique({
        where: { id: Number(id) },
        include: { comments: true }
      });

      if (!post) {
        throw new Error('No post found with that id.');
      }

      const commentIds = post.comments.map(comment => comment.id);

      await prisma.$transaction([
        prisma.comment.deleteMany({ where: { id: { in: commentIds }}}),
        prisma.post.delete({ where: { id: Number(id) }})
      ]);

      return post;
    },
    async updatePost(parent, { id, data }, { prisma }, info) {
      // const post = db.postData.find(post => post.id === id);
      const post = await prisma.post.findUnique({ where: { id: Number(id) }});

      if (!post) {
        throw new Error('No post found for that id.');
      }

      const updates = {};
      let mutationType = 'UPDATED';

      Object.entries(data).forEach(([ key, value ]) => {
        // Verify none of the fields provided is null to avoid potential data corruption
        if (value === null) return;

        // Verify the published field has changed, signaling an updated or deleted post
        if (key === 'published') {
          mutationType = value ? 'CREATED' : 'DELETED';
        }

        // Finally update the post value
        updates[key] = value;
      });

      return await prisma.post.update({
        where: { id: Number(id) },
        data: updates
      });
    },
  }
};
