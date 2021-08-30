const { PrismaClient } = require('@prisma/client');
const faker = require('faker');
const argon2 = require('argon2');

const prisma = new PrismaClient();

const TOTAL_SEED_USERS = 6;

async function main() {

  // Fresh start
  await prisma.$transaction([
    prisma.comment.deleteMany(),
    prisma.post.deleteMany(),
    prisma.user.deleteMany()
  ]);

  /**
   * Generate:
   * 6 users
   * 4 posts each
   * 2 comments each
  */
  const userIds = [];
  const postIds = [];

  for (let i = 0; i < TOTAL_SEED_USERS; i++) {
    const userId = faker.unique(faker.datatype.number);
    const postId1 = faker.unique(faker.datatype.number);
    const postId2 = faker.unique(faker.datatype.number);
    const postId3 = faker.unique(faker.datatype.number);
    const postId4 = faker.unique(faker.datatype.number);

    // To later add comments in these posts
    userIds.push(userId);
    postIds.push(postId1, postId2, postId3, postId4);

    await prisma.user.create({
      data: {
        id: userId,
        username: faker.internet.userName(),
        email: faker.internet.exampleEmail(),
        password: await argon2.hash(faker.internet.password()),
        role: faker.random.arrayElement(['USER', 'ADMIN']),
        certification: faker.random.arrayElement([ 'OPEN_WATER', 'ADVANCED', 'RESCUE', 'DIVEMASTER' ]),
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
            {
              id: postId4,
              title: faker.company.catchPhrase(),
              body: faker.lorem.paragraph(),
              published: faker.datatype.boolean(),
            },
          ]
        }
      }
    });
  }

  // Now create 2 comments per user on a random post
  for (let i = 0 ; i < TOTAL_SEED_USERS; i++) {

    // The posts where the new comments will be added, increase their commentCount
    const postId1 = faker.random.arrayElement(postIds);
    const postId2 = faker.random.arrayElement(postIds);

    await prisma.post.updateMany({
      where: { id: { in: [ postId1, postId2 ] }},
      data: {
        commentCount: { increment: 1 }
      }
    });

    await prisma.comment.createMany({
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
      ]
    });
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
