const { GraphQLUpload } = require('graphql-upload');

module.exports = {
  Upload: GraphQLUpload,
  Mutation: {
    async singleFileUpload(parent, { id, file }, { user, services }, info) {
      return await services.file.singleFileUpload(Number(id), file, user);
    },
  },
};
