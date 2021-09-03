const { GraphQLUpload } = require('graphql-upload');

module.exports = {
  Upload: GraphQLUpload,
  Mutation: {
    async singleUpload(parent, { id, file }, { user, services }, info) {
      return await services.file.singleUpload(Number(id), file, user);
    },
  },
};
