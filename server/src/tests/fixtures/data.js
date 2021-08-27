const users = [
  {
    id: 1,
    username: "Abigail",
    email: "abigail@example.com",
    password: "abigailInWonderland",
    role: "USER",
  },
  {
    id: 2,
    username: "Barret",
    email: "barret@example.com",
    password: "$argon2i$v=19$m=4096,t=3,p=1$rxNMsDbdx4bl0LEE7YFefw$cynBsQ/rxVpFcPWDpea2ld1THwRVxk6MIafjE8xrzk0",
    role: "ADMIN",
  },
  {
    id: 3,
    username: "Cinderella",
    email: "cinderella@example.com",
    password: "$argon2i$v=19$m=4096,t=3,p=1$FE/cIBvOr5I+wwCCdrDWMw$yCAC1A7DMNB7KOEXhJN8yQQQC9aGPsaHOAQJkmg846M",
    role: "USER",
  },
];

const posts = [
  {
    id: 1,
    title: "A New Beginning",
    body: "So far, so good!",
    published: true
  },
  {
    id: 2,
    title: "Testing Prisma fucking sucks!",
    body: "It's always nice and pretty on the outside but dig up a little and oh boy...",
    published: true
  },
  {
    id: 3,
    title: "Bucket list destination: Rio de Janeiro",
    body: "It all started one day after dinner, while I was watching my backpacking photos...",
    published: true
  },
];

const comments = [
  {
    id: 1,
    text: "Congratulations!",
    postId: posts[0].id,
    authorId: users[1].id
  },
  {
    id: 2,
    text: "It will become easier once you get the hang of it. Have you considered using Docker?",
    postId: posts[1].id,
    authorId: users[2].id
  },
  {
    id: 3,
    text: "Yes, but it's really not that easy since there are so many things to keep up with!",
    postId: posts[2].id,
    authorId: users[0].id
  },
];

module.exports = {
  users,
  posts,
  comments,
  tokens: {
    token0: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI5ODMzMTY3fQ.1Wv-juWE79RCFmpBuTazQQunoSEyF3KMaxB9naO-a7I',
    token1: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjI5ODMzMTcxfQ.Gdslr_nUDQuOPQWsYYNXywnTENMKypa_hBOjnXXBMCw',
    token2: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjI5ODMzMTczfQ.qwygbXwlNli7KctDl1c75HpNFYWwc6MqS4nAelOA7Ww',
  }
};
