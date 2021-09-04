const { GraphQLUpload } = require('graphql-upload');

module.exports = {
  Upload: GraphQLUpload,
  Mutation: {
    async singlePostUpload(parent, { id, file }, { user, services }, info) {
      return await services.file.singlePostUpload(Number(id), file, user);
    },
  },
};
