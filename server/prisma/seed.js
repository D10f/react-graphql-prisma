const { PrismaClient } = require('@prisma/client');
const faker = require('faker');
const argon2 = require('argon2');

const prisma = new PrismaClient();

const TOTAL_SEED_USERS = 6;

/**
 * Generate:
 * 6 users ( + 1 test user and admin, without posts nor comments)
 * 4 posts each ( using predefined images )
 * random amount of comments on a random amount of posts
 * random amount of likes on a random amount of posts
*/
async function main() {

  // Fresh start
  await prisma.$transaction([
    prisma.notification.deleteMany(),
    prisma.comment.deleteMany(),
    prisma.post.deleteMany(),
    prisma.user.deleteMany()
  ]);

  // Creat two users that I can easily login as to test on multiple sessions
  await prisma.user.createMany({
    data: [
      {
        id: faker.unique(faker.datatype.number),
        username: 'Mario',
        email: 'mario@example.com',
        password: await argon2.hash('adminpassword'),
        role: 'ADMIN',
        url: 'http://localhost:5000/mario-av-350.webp',
        certification: 'INSTRUCTOR'
      },
      {
        id: faker.unique(faker.datatype.number),
        username: 'Luigi',
        email: 'luigi@example.com',
        password: await argon2.hash('iamnotmario'),
        role: 'USER',
        url: 'http://localhost:5000/luigi-350.webp',
        certification: 'INSTRUCTOR'
      }
    ]
  });

  // Keep references for later use (add comments)
  const userIds = [];
  const postIds = [];

  // Initialize function to associate images to each post
  const createPosts = postGenerator();

  for (let i = 0; i < TOTAL_SEED_USERS; i++) {
    const userId = faker.unique(faker.datatype.number);
    const postId1 = faker.unique(faker.datatype.number);
    const postId2 = faker.unique(faker.datatype.number);
    const postId3 = faker.unique(faker.datatype.number);
    const postId4 = faker.unique(faker.datatype.number);

    // Keep references for later use (add comments)
    userIds.push(userId);
    postIds.push(postId1, postId2, postId3, postId4);

    await prisma.user.create({
      data: {
        id: userId,
        username: faker.internet.userName(),
        email: faker.internet.exampleEmail(),
        password: await argon2.hash(faker.internet.password()),
        role: 'USER',
        certification: faker.random.arrayElement(['OPEN_WATER', 'ADVANCED', 'RESCUE', 'DIVEMASTER', 'INSTRUCTOR']),
        url: faker.datatype.boolean() ? faker.image.avatar() : '',
        posts: {
          create: createPosts([postId1, postId2, postId3, postId4])
        }
      }
    });
  }

  // Randomly pick any number of posts, increase their commentCount, and comment in each of them
  for (let i = 0; i < TOTAL_SEED_USERS; i++) {

    // The posts where the new comments will be added, increase their commentCount
    const postsIdsToCommentOn = faker.random.arrayElements(postIds);

    await prisma.post.updateMany({
      where: { id: { in: postsIdsToCommentOn } },
      data: {
        commentCount: { increment: 1 }
      }
    });

    const commentsOnPosts = postsIdsToCommentOn.map(postId => ({
      id: faker.unique(faker.datatype.number),
      text: faker.lorem.sentences(),
      authorId: userIds[i],
      postId: postId
    }))

    await prisma.comment.createMany({
      data: commentsOnPosts
    });
  }

  // And a final round to add likes to a number of posts
  for (let i = 0; i < postIds.length; i++) {
    // Give it a chance to not give any likes
    if (Math.random() > 0.75) continue;

    // The users who will give a like to this post, formatted to accomodate prisma's "connect"
    // keyword
    const likedByIds = faker.random.arrayElements(userIds).map(id => ({ id: id }))

    await prisma.post.update({
      where: { id: postIds[i] },
      data: {
        likeCount: { set: likedByIds.length },
        likedBy: { connect: likedByIds }
      }
    });
  }
}

function postGenerator() {

  const full = 900;
  const preview = 350;

  let currentIdx = 0;

  return (postIds) => {
    return postIds.map(id => {
      currentIdx++;
      return {
        id: id,
        title: faker.company.catchPhrase(),
        body: faker.lorem.paragraph(),
        excerpt: faker.lorem.sentences(2),
        published: faker.datatype.boolean(),
        url: `http://localhost:5000/nature${currentIdx}-${full}.webp`,
        previewUrl: `http://localhost:5000/nature${currentIdx}-${preview}.webp`,
      };
    })
  }
}

main()
  .catch(err => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
