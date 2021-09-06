/**
 * Processes images following the same algorithm and libraries that the real application uses,
 * producing an equivalent quality images used for dummy test data while seeding the db.
 */

const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const { pipeline } = require('stream/promises');
const sharp = require('sharp');

const readdir = promisify(fs.readdir);

const IMG_PUBLIC_PATH = path.resolve('public');

// Full and preview post picture
const POST_FULL_IMG_SIZE = 900;
const POST_PREV_IMG_SIZE = 350;

async function main() {

  const files = await readdir('public');

  for (let i = 0; i < files.length; i++) {
    const fileLocation = getFileLocation(files[i]);
    const transformerStream = transformImage(fileLocation);
    await pipeline(fs.createReadStream(path.resolve('public', files[i])), transformerStream);
  }

  function transformImage(fileLocation, options = {}) {
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
  }

  function getFileLocation(filename) {
    const basename = filename.replace(path.extname(filename), '');
    const absPath = path.join(IMG_PUBLIC_PATH, basename);
    return absPath;
  }

  function getFileUrls(filename) {
    const basename = filename.replace(path.extname(filename), '');
    // TODO: set environment variable for prefix url
    return {
      url: `http://localhost:5000/${basename}-${POST_FULL_IMG_SIZE}.webp`,
      previewUrl: `http://localhost:5000/${basename}-${POST_PREV_IMG_SIZE}.webp`,
    };
  }
}

main();
