const path = require('path');
const fs = require('fs');
const { pipeline } = require('stream/promises');
const { ForbiddenError, UserInputError } = require('apollo-server');
const sharp = require('sharp');
const AuthService = require('./AuthService');

const validMimeTypes = new RegExp(/^image\/(png|jpeg|webp|gif)$/i);

const IMG_PUBLIC_PATH = 'public';
const POST_FULL_IMG_SIZE = 900;
const POST_PREV_IMG_SIZE = 300;

const USER_FULL_IMG_SIZE = 300;
const USER_PREV_IMG_SIZE = 40;

module.exports = ({ UserModel, PostModel }) => ({
  async singleUpload(id, file, reqUser) {

    const { createReadStream, filename, mimetype, encoding } = await file;
    const { isAuthor, isSameUser, isAdmin } = AuthService;

    if (!this.validateType(mimetype)) {
      throw new UserInputError('You must choose a valid image file.');
    }

    // CHANGE THIS AFTER TESTING
    if (!AuthService.isAuthorized(reqUser, reqUser.id, [ isAuthor, isSameUser, isAdmin ])) {
      throw new ForbiddenError('You are not authorized to perform this action.');
    }

    // Get the final location of the file
    const fullPath = this.getFileLocation(filename);
    const { transformer, url, previewUrl } = this.transformAsPostImage(fullPath);

    try {
      await pipeline(createReadStream(), transformer);
      return { url, previewUrl };

    } catch (err) {
      console.error(err);
      throw new Error('Internal Server Error');
    }
  },

  transformAsPostImage(filename) {
    const transformer = sharp();
    const url = `${filename}-${POST_FULL_IMG_SIZE}.webp`
    const previewUrl = `${filename}-${POST_PREV_IMG_SIZE}.webp`;

    transformer
      .clone()
      .resize({ width: POST_FULL_IMG_SIZE, withoutEnlargement: true })
      .webp()
      .toFile(url);

    transformer
      .clone()
      .resize({ width: POST_PREV_IMG_SIZE, withoutEnlargement: true })
      .webp()
      .toFile(previewUrl);

    return { transformer, url, previewUrl };
  },

  transformAsProfileImage() {
    const transformer = sharp();
    const url = `${filename}-${USER_FULL_IMG_SIZE}.webp`
    const previewUrl = `${filename}-${USER_PREV_IMG_SIZE}.webp`;

    transformer
      .clone()
      .resize({ width: USER_FULL_IMG_SIZE, withoutEnlargement: true })
      .webp()
      .toFile(url);

    transformer
      .clone()
      .resize({ width: USER_PREV_IMG_SIZE, height: USER_PREV_IMG_SIZE, withoutEnlargement: true })
      .webp()
      .toFile(previewUrl);

    return { transformer, url, previewUrl };
  },

  validateType(mimetype){
    return validMimeTypes.test(mimetype);
  },

  getFileLocation(filename) {
    const basename = filename.replace(path.extname(filename), '');
    const absPath = path.resolve(IMG_PUBLIC_PATH, basename);
    return absPath;
  }
});
