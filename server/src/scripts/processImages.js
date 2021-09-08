/**
 * Processes images the exact same way the production application would. Use this to produce resized
 * images out of a custom set of image files which can then be used while seeding the database
 */

const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const { pipeline } = require('stream/promises');
const sharp = require('sharp');

const readdir = promisify(fs.readdir);

const IMG_PUBLIC_PATH = path.resolve('public');

// Full and preview post picture
const POST_FULL_IMG_SIZE = 350;
const POST_PREV_IMG_SIZE = 300;

async function main() {

  const filesInDir = await readdir('public')
  const files = filesInDir.filter(file => file.includes('luigi'));

  console.log('PSA: Double check your filenames to avoid accidental deletion!')
  console.log('exiting... ');
  return;

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
