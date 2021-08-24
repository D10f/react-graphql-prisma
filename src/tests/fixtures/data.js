const users = [
  {
    id: 1,
    username: "Abigail",
    email: "abigail@example.com",
    password: "abigailInWonderland",
    role: "USER"
  },
  {
    id: 2,
    username: "Barret",
    email: "barret@example.com",
    password: "barretInWonderland",
    role: "ADMIN"
  },
  {
    id: 3,
    username: "Cinderella",
    email: "cinderella@example.com",
    password: "$argon2i$v=19$m=4096,t=3,p=1$FE/cIBvOr5I+wwCCdrDWMw$yCAC1A7DMNB7KOEXhJN8yQQQC9aGPsaHOAQJkmg846M",
    role: "USER"
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
    text: "Congratulations!",
    postId: posts[0].id,
    authorId: users[1].id
  },
  {
    text: "It will become easier once you get the hang of it. Have you considered using Docker?",
    postId: posts[1].id,
    authorId: users[0].id
  },
  {
    text: "Yes, but it's really not that easy since there are so many things to keep up with!",
    postId: posts[1].id,
    authorId: users[1].id
  },
  {
    text: "Amazing! I was there three years ago and I had the time of my life",
    postId: posts[2].id,
    authorId: users[1].id
  },
  {
    text: "Hey! Do you have any recommendations about what to do there?",
    postId: posts[2].id,
    authorId: users[2].id
  },
];

module.exports = {
  users,
  posts,
  comments
};
