const path = require('path');
const fs = require('fs');
const { pipeline } = require('stream/promises');
const { ForbiddenError, UserInputError } = require('apollo-server');
const sharp = require('sharp');
const AuthService = require('./AuthService');

const validMimeTypes = new RegExp(/^image\/(png|jpeg|webp|gif)$/i);

const IMG_PUBLIC_PATH = path.resolve('public');

// Full and preview post picture
const POST_FULL_IMG_SIZE = 900;
const POST_PREV_IMG_SIZE = 350;

// Full and avatar user profile picture
const USER_FULL_IMG_SIZE = 300;
const USER_PREV_IMG_SIZE = 40;

module.exports = ({ UserModel, PostModel }) => ({
  /**
   * Uploads an image associated to a post or user's profile, defined by the resource parameter
   */
  async singlePostUpload(id, file, reqUser) {

    const { createReadStream, filename, mimetype, encoding } = await file;
    const { isAuthor, isAdmin } = AuthService;

    if (!this.validateType(mimetype)) {
      throw new UserInputError('You must choose a valid image file.');
    }

    const post = await PostModel.findById(id);

    // Check permissions: is either the author of the post, owner of the profile or an admin
    if (!AuthService.isAuthorized(reqUser, post.authorId, [ isAuthor, isAdmin ])) {
      throw new ForbiddenError('You are not authorized to perform this action.');
    }

    // Get the final location of the file and it's public web urls
    const fileLocation = this.getFileLocation(filename);
    const { url, previewUrl } = this.getFileUrls(filename);

    // Produce the transformer stream, passing the path where images should be saved to
    const transformerStream = this.transformImage(fileLocation);

    try {
      await pipeline(createReadStream(), transformerStream);
      await PostModel.update(id, { url, previewUrl });
      return { url, previewUrl };
    } catch (err) {
      console.error(err);
      throw new Error('Internal Server Error');
    }
  },

  transformImage(fileLocation) {
    const transformerStream = sharp();
    const url = `${fileLocation}-${POST_FULL_IMG_SIZE}.webp`
    const previewUrl = `${fileLocation}-${POST_PREV_IMG_SIZE}.webp`;

    transformerStream
      .clone()
      .resize({ width: POST_FULL_IMG_SIZE, withoutEnlargement: true })
      .webp()
      .toFile(url);

    transformerStream
      .clone()
      .resize({ width: POST_PREV_IMG_SIZE, withoutEnlargement: true })
      .webp()
      .toFile(previewUrl);

    return transformerStream;
  },

  validateType(mimetype){
    return validMimeTypes.test(mimetype);
  },

  getFileLocation(filename) {
    const basename = filename.replace(path.extname(filename), '');
    const absPath = path.join(IMG_PUBLIC_PATH, basename);
    return absPath;
  },

  getFileUrls(filename) {
    const basename = filename.replace(path.extname(filename), '');
    // TODO: set environment variable for prefix url
    return {
      url: `http://localhost:5000/${basename}-${POST_FULL_IMG_SIZE}.webp`,
      previewUrl: `http://localhost:5000/${basename}-${POST_PREV_IMG_SIZE}.webp`,
    };
  },
});
