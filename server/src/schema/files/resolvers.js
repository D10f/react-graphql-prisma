const fs = require('fs');
const { finished } = require('stream/promises');
const { GraphQLUpload } = require('graphql-upload');

module.exports = {
  Upload: GraphQLUpload,
  Mutation: {
    async singleUpload(parent, { file }, { user, services }, info) {
      const { createReadStream, filename, mimetype, encoding } = await file;

      console.log(file);

      const stream = createReadStream();

      const out = fs.createWriteStream(filename);
      stream.pipe(out);
      await finished(out);

      return { filename, mimetype, encoding };
    },
  },
};
