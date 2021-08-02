module.exports = {
  Query: {
    async users(parent, args, { prisma }, info) {
      const query = args.query ? args.query.toLowerCase() : undefined;
      return query
        ? await prisma.user.findMany({ where: { name: query }})
        : await prisma.user.findMany()
    },
  },
  User: {
    async posts(parent, args, { prisma }, info) {
      return await prisma.post.findMany({ where: { authorId: parent.id }});
    },
    async comments(parent, args, { prisma }, info) {
      return await prisma.comment.findMany({ where: { authorId: parent.id }});
    }
  },
  Mutation: {
    async createUser(parent, args, { prisma }, info) {
      const isEmailTaken = await prisma.user.findUnique({ where: { email: args.data.email }});

      if (isEmailTaken) {
        throw new Error('Email is already in use.');
      }

      return await prisma.user.create({ data: args.data });
    },
    async deleteUser(parent, args, { prisma }, info) {
      const user = await prisma.user.findUnique({
        where: { id: args.id },
        include: { posts: true, comments: true }
      });

      if (!user) {
        throw new Error('No user found with that id.');
      }

      // Get all Ids of posts and comments by that user
      const postsByUser = res.posts.map(post => post.id);
      const commentsByUser = res.comments.map(comment => comment.id);

      // Delete comments, posts and user in a single transaction due to closely coupled data
      await prisma.$transaction([
        prisma.comment.deleteMany({ where: { id: { in: commentsByUser } }}),
        prisma.post.deleteMany({ where: { id: { in: postsByUser } }}),
        prisma.user.delete({ where: { id: args.id }})
      ]);

      return user;
    },
    async updateUser(parent, { id, data }, { prisma }, info) {
      const user = await prisma.user.findUnique({ where: { id: Number(id) } });

      if (!user) {
        throw new Error('No user found with that id.');
      }

      const updates = {};

      // Verify none of the fields provided is null to avoid potential data corruption
      Object.entries(data).forEach(([ key, value ]) => {
        if (value !== null) {
          updates[key] = value;
        }
      });

      return await prisma.user.update({
        where: { id: Number(id) },
        data: updates
      });
    }
  }
};
