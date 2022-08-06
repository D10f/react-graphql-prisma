const path = require('path');
const fs = require('fs');
const { pipeline } = require('stream/promises');
const sharp = require('sharp');
const { ForbiddenError, UserInputError } = require('apollo-server');
const AuthService = require('./AuthService');

const validMimeTypes = new RegExp(/^image\/(png|jpeg|webp|gif)$/i);

const IMG_PUBLIC_PATH = path.resolve('public/images');

// Full and preview post picture
const POST_FULL_IMG_SIZE = 900;
const POST_PREV_IMG_SIZE = 350;

// Full and avatar user profile picture
const USER_FULL_IMG_SIZE = 300;
const USER_PREV_IMG_SIZE = 40;

module.exports = ({ UserModel, PostModel }) => ({
  /**
   * Uploads an image associated to a post
   */
  async singleFileUpload(id, file, reqUser) {

    const { createReadStream, filename, mimetype, encoding } = await file;
    const { isAuthor, isAdmin } = AuthService;

    if (!this.validateType(mimetype)) {
      throw new UserInputError('You must choose a valid image file.');
    }

    // Check if the post or user profile being updated exists; this determines the following options
    const [post, user] = await Promise.all([
      PostModel.findById(id),
      UserModel.findById(id)
    ]);

    if (!post && !user) {
      throw new UserInputError('Cannot find resource with that id.');
    }

    // If the resource being updated is a post, extract it's authorId in order to check for permissions
    const resourceId = post ? post.authorId : id;

    if (!AuthService.isAuthorized(reqUser, resourceId, [isAuthor, isAdmin])) {
      throw new ForbiddenError('You are not authorized to perform this action.');
    }

    // Get the file system location path and public web urls for the file
    // TODO: Add some unique identifier to filename
    const fileLocation = this.getFileLocation(filename);
    const { url, previewUrl } = this.getFileUrls(filename, {
      url: post ? POST_FULL_IMG_SIZE : USER_FULL_IMG_SIZE,
      previewUrl: post ? POST_PREV_IMG_SIZE : null,
    });

    // Produce the transformer stream, passing the path where images should be saved to
    // TODO: provide additional options to specify dimensions, etc
    const transformerStream = this.transformImage(fileLocation, {
      full: post ? POST_FULL_IMG_SIZE : USER_FULL_IMG_SIZE,
      preview: post ? POST_PREV_IMG_SIZE : null,
      format: 'webp'
    });

    try {
      await pipeline(createReadStream(), transformerStream);
      if (post) {
        await PostModel.update(id, { url, previewUrl })
      } else {
        await UserModel.update(id, { url })
      }

      return { url, previewUrl };
    } catch (err) {
      console.error(err);
      throw new Error('Internal Server Error');
    }
  },

  transformImage(fileLocation, options = {}) {
    const { full, preview, format } = options;

    const fullSizePath = full && `${fileLocation}-${full}.${format}`
    const previewSizePath = preview && `${fileLocation}-${preview}.${format}`;

    const transformerStream = sharp();

    if (full) {
      transformerStream
        .clone()
        .resize({ width: full, withoutEnlargement: true })
        .webp()
        .toFile(fullSizePath);
    }

    if (preview) {
      transformerStream
        .clone()
        .resize({ width: preview, withoutEnlargement: true })
        .webp()
        .toFile(previewSizePath);
    }

    return transformerStream;
  },

  validateType(mimetype) {
    return validMimeTypes.test(mimetype);
  },

  getFileLocation(filename) {
    const basename = filename.replace(path.extname(filename), '');
    const absPath = path.join(IMG_PUBLIC_PATH, basename);
    return absPath;
  },

  getFileUrls(filename, options = {}) {

    const basename = filename.replace(path.extname(filename), '');
    // TODO: set environment variable for prefix url
    return {
      url: options.url && `/${basename}-${options.url}.webp`,
      previewUrl: options.previewUrl && `/${basename}-${options.previewUrl}.webp`,
    };
  },
});
