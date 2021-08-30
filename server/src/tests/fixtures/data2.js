const faker = require('faker');
const argon2 = require('argon2');

const TOTAL_SEED_USERS = 3;
const USER_PASSWORD = 'userprofile123!';

/**
 * Seeds the database with randomized data:
 *
 * 3 users
    * Roles are: ADMIN, USER, USER
    * Password: userprofile123!
 * 3 posts per user
 * 3 comments per user on a random post
 *
 */
async function seedData(prisma) {
  // Fresh start
  await prisma.$transaction([
    prisma.comment.deleteMany(),
    prisma.post.deleteMany(),
    prisma.user.deleteMany()
  ]);

  const userIds = [];
  const postIds = [];

  for (let i = 0; i < TOTAL_SEED_USERS; i++) {
    const userId  = faker.unique(faker.datatype.number);
    const postId1 = faker.unique(faker.datatype.number);
    const postId2 = faker.unique(faker.datatype.number);
    const postId3 = faker.unique(faker.datatype.number);

    // We'll re-use these afterwards to add the comments
    userIds.push(userId);
    postIds.push(postId1, postId2, postId3);

    await prisma.user.create({
      data: {
        id: userId,
        username: faker.internet.userName(),
        email: faker.internet.exampleEmail(),
        password: await argon2.hash(USER_PASSWORD),
        role: i === 0 ? 'ADMIN' : 'USER',
        posts: {
          create: [
            {
              id: postId1,
              title: faker.company.catchPhrase(),
              body: faker.lorem.paragraph(),
              published: faker.datatype.boolean(),
            },
            {
              id: postId2,
              title: faker.company.catchPhrase(),
              body: faker.lorem.paragraph(),
              published: faker.datatype.boolean(),
            },
            {
              id: postId3,
              title: faker.company.catchPhrase(),
              body: faker.lorem.paragraph(),
              published: faker.datatype.boolean(),
            },
          ]
        }
      }
    });
  }

  /* Now create three comments per user, on a random post */

  for (let i = 0; i < TOTAL_SEED_USERS; i++) {

    // Select the random posts to receive a comment
    const postId1 = faker.random.arrayElement(postIds);
    const postId2 = faker.random.arrayElement(postIds);
    const postId3 = faker.random.arrayElement(postIds);

    await prisma.$transaction([
      // Create the comments
      prisma.comment.createMany({
        data: [
          {
            id: faker.unique(faker.datatype.number),
            text: faker.lorem.sentences(),
            authorId: userIds[i],
            postId: postId1
          },
          {
            id: faker.unique(faker.datatype.number),
            text: faker.lorem.sentences(),
            authorId: userIds[i],
            postId: postId2
          },
          {
            id: faker.unique(faker.datatype.number),
            text: faker.lorem.sentences(),
            authorId: userIds[i],
            postId: postId3
          },
        ]
      }),
      // And update their comment count
      prisma.post.updateMany({
        where: { id: { in: [ postId1, postId2, postId3 ] }},
        data: { commentCount: { increment: 1 }}
      }),
    ]);
  }
}

module.exports = seedData;
