const faker = require('faker');
const argon2 = require('argon2');

async function seedDatabase(prisma) {
  // Create users, one post each in order of appearance
  await prisma.$transaction(
    users.map((user, idx) => {
      return prisma.user.create({
        data: {
          ...user,
          posts: {
            create: [ posts[idx] ]
          }
        }
      });
    })
  );

  // Create comments one per user on another one's post
  await prisma.$transaction(
    comments.map((comment, idx) => {
      return prisma.comment.create({
        data: {
          ...comment,
        }
      });
    })
  )
}

const users = [
  {
    id: 1,
    username: 'Admin',
    email: faker.internet.exampleEmail(),
    // AdminInWonderland
    password: '$argon2i$v=19$m=4096,t=3,p=1$zIsUx0LuRWu0e8zlPfDNQg$+YTWx3yJQ0E1c5VQ4R2pqXtRvfToK5LQukC3oB8+ckc',
    role: "ADMIN",
  },
  {
    id: 2,
    username: 'User',
    email: faker.internet.exampleEmail(),
    // UserInWonderLand
    password: '$argon2i$v=19$m=4096,t=3,p=1$Qvh9mBnLJSlGxVROepNPTQ$kfgDYxUk0+UZbbW/ZDFVG+xTHtjO5gJmBz6bdJnjTT4',
    role: "USER",
  },
  {
    id: 3,
    username: faker.internet.userName(),
    email: faker.internet.exampleEmail(),
    password: faker.internet.password(),
    role: "USER",
  },
];

const posts = [
  {
    id: 1,
    title: faker.company.catchPhrase(),
    body: faker.lorem.paragraph(),
    excerpt: faker.lorem.sentences(2),
    commentCount: 1,
  },
  {
    id: 2,
    title: faker.company.catchPhrase(),
    body: faker.lorem.paragraph(),
    excerpt: faker.lorem.sentences(2),
    commentCount: 1,
  },
  {
    id: 3,
    title: faker.company.catchPhrase(),
    body: faker.lorem.paragraph(),
    excerpt: faker.lorem.sentences(2),
    commentCount: 1,
  },
];

const comments = [
  {
    id: 1,
    text: faker.lorem.sentences(),
    authorId: 1,
    postId: 2,
  },
  {
    id: 2,
    text: faker.lorem.sentences(),
    authorId: 2,
    postId: 3,
  },
  {
    id: 3,
    text: faker.lorem.sentences(),
    authorId: 3,
    postId: 1,
  },
];

module.exports = {
  seedDatabase,
  users,
  posts,
  comments,
  tokens: {
    admin: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjMxMTg3MzI0fQ.h_FqlHguIs-rbX55tiPJ1GuFVVAVJO0rQ5GGANCC2IM',
    user: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjMxMTg3MzI3fQ.PBgo9Knq4rxADQsdKNsuVVja47_B-GzFo2sxXzkkfuE',
    user2: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjMxMTg3MzMwfQ.GwdPY3nJzSNvNE0002QWW4Quk9j_7cYW1a9YYG59gtg',
  }
};
