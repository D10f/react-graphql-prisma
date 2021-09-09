const { queries, mutations } = require('./fixtures/posts');
const { queries: userQueries } = require('./fixtures/users');
const { setupServer, setupDatabase, teardownDatabase } = require('./fixtures/server');
const { posts, users, tokens } = require('./fixtures/seedData');

let query, mutate, setOptions;

beforeAll(async () => {
  const server = await setupServer();
  query = server.query;
  mutate = server.mutate;
  setOptions = server.setOptions;
});

beforeEach(async () => {
  await setupDatabase();
  setOptions({
    request: {
      headers: {
        authorization: `Bearer ${tokens.user}`,
      }
    }
  });
});

afterEach(async () => await teardownDatabase());

test('Should create a new post', async () => {

  const newPost = {
    title: "Some title",
    body: "Pretty wall of long lorem ipsum text",
  };

  const result = await mutate(mutations.CREATE_POST, {
    variables: { input: newPost }
  });

  /* Assert that new post is created with an id and the default published value */
  expect(result.data.createPost).toHaveProperty('id', expect.any(String));
  expect(result.data.createPost).toHaveProperty('published', true);
  expect(result.data.createPost).toHaveProperty('allowComments', true);
});


test('Should NOT create a new post if unauthenticated', async () => {

  setOptions({ request: {} });

  const newPost = {
    title: "Some title",
    body: "Pretty wall of long lorem ipsum text"
  };

  const result = await mutate(mutations.CREATE_POST, {
    variables: { input: newPost }
  });

  /* Assert that new post is created with an id and the default published value */
  expect(result.errors[0].message).toBe('You must be logged in to perform this action.');
});

test('Should NOT create a new post due to invalid format', async () => {

  const newPost = {
    title: '',
    body: ''
  };

  const result = await mutate(mutations.CREATE_POST, {
    variables: { input: newPost }
  });

  /* Assert that validations prevents post from being created and returns correct errors */
  expect(result.errors[0].extensions.errors[0].message).toBe('Title must be a string between 1 and 100 characters long.');
});

test('Should update an existing post', async () => {

  const updates = {
    title: 'React hooks [updated 2021]',
    published: true
  };

  const result = await mutate(mutations.UPDATE_POST, {
    variables: { id: 2, input: updates }
  });

  expect(result.data.updatePost.title).toBe(updates.title);
  expect(result.data.updatePost.published).toBe(updates.published);
});

test('Should update another user\'s post while logged in as admin', async () => {

  setOptions({
    request: {
      headers: {
        authorization: `Bearer ${tokens.admin}`,
      }
    }
  });

  const updates = {
    title: 'React hooks [updated 2021]',
    published: true
  };

  const result = await mutate(mutations.UPDATE_POST, {
    variables: { id: 3, input: updates }
  });

  expect(result.data.updatePost.title).toBe(updates.title);
  expect(result.data.updatePost.published).toBe(updates.published);
});

test('Should NOT update another user\'s post without being an admin', async () => {

  const updates = {
    title: 'React hooks [updated 2021]',
    published: true
  };

  const result = await mutate(mutations.UPDATE_POST, {
    variables: { id: 3, input: updates }
  });

  expect(result.errors[0].message).toBe('You are not authorized to perform this action.');
});

test('Should NOT update if unauthenticated', async () => {

  setOptions({ request: {} });

  const updates = {
    title: 'React hooks [updated 2021]',
    published: true
  };

  const result = await mutate(mutations.UPDATE_POST, {
    variables: { id: 2, input: updates }
  });

  expect(result.errors[0].message).toBe('You must be logged in to perform this action.');
});

test('Should NOT update a post due to invalid format', async () => {

  const updates = {
    title: '',
    body: ''
  };

  const result = await mutate(mutations.UPDATE_POST, {
    variables: { id: 2, input: updates }
  });

  /* Assert that validations prevents post from being created and returns correct errors */
  expect(result.errors[0].extensions.errors[0].message).toBe('Title must be a string between 1 and 100 characters long.');
});

test('Should delete an existing post', async () => {

  const result = await mutate(mutations.DELETE_POST, {
    variables: { id: 2 }
  });

  /* Assert return values from deleting post are correct */
  expect(result.data.deletePost).toEqual({
    id: `${posts[1].id}`, // cast to string as it's returned as number
    title: posts[1].title,
    body: posts[1].body,
    published: true
  });

  const result2 = await query(queries.GET_POSTS);

  /* Assert that only 2 posts are left */
  expect(result2.data.posts).toHaveLength(2);
});

test('Should successfully like and dislike a post', async () => {

  /* First like a post and assert that both post and user have been updated  */
  const result = await mutate(mutations.LIKE_OR_UNLIKE_POST, {
    variables: { postId: posts[0].id }
  });

  expect(result.data.likeOrUnlikePost.likeCount).toBe(1);
  expect(result.data.likeOrUnlikePost.likedBy).toEqual(
    [{
      id: `${users[1].id}`,
      username: users[1].username,
      likes: [{
        id: `${posts[0].id}`,
        title: posts[0].title
      }]
    }]
  );

  /* Then dislike the post and assert once again that user and post are updated */
  const result2 = await mutate(mutations.LIKE_OR_UNLIKE_POST, {
    variables: { postId: posts[0].id }
  });

  expect(result2.data.likeOrUnlikePost.likeCount).toBe(0);
  expect(result2.data.likeOrUnlikePost.likedBy).toEqual([]);
});

test('Should generate a notification when a post gets a like', async () => {

  /* First like a post and assert that both post and user have been updated  */
  const result = await mutate(mutations.LIKE_OR_UNLIKE_POST, {
    variables: { postId: posts[0].id }
  });


  expect(result.data.likeOrUnlikePost.likeCount).toBe(1);

  // First, it should fail to check another users notifications
  const result2 = await query(userQueries.GET_NOTIFICATIONS, {
    variables: { id: users[0].id }
  });

  expect(result2.errors[0].message).toBe('You are not authorized to perform this action.');

  setOptions({
    request: {
      headers: {
        authorization: `Bearer ${tokens.admin}`,
      }
    }
  });

  // Try again as admin
  const result3 = await query(userQueries.GET_NOTIFICATIONS, {
    variables: { id: users[0].id }
  });

  expect(result3.data.getUserNotifications).toHaveLength(1);
  expect(result3.data.getUserNotifications[0]).toHaveProperty('id', expect.any(String));
  expect(result3.data.getUserNotifications[0].postId).toBe(String(posts[0].id));
  expect(result3.data.getUserNotifications[0].emitterId).toBe(String(users[1].id));

});

test('Should fail to like a post if unauthenticated', async () => {

  setOptions({ request: {} });

  const result = await mutate(mutations.LIKE_OR_UNLIKE_POST, {
    variables: { postId: posts[0].id }
  });

  expect(result.errors[0].message).toBe('You must be logged in to perform this action.');
});

test('Should retrieve only posts that a user has liked', async () => {

  // Should be empty first
  const result = await query(queries.GET_FAVORITE_POSTS);

  expect(result.data.postsForFavoriteFeed).toHaveLength(0);

  // Like a post and query again
  await mutate(mutations.LIKE_OR_UNLIKE_POST, {
    variables: { postId: posts[0].id }
  });

  const result2 = await query(queries.GET_FAVORITE_POSTS);
  expect(result2.data.postsForFavoriteFeed).toHaveLength(1);
  expect(result2.data.postsForFavoriteFeed[0].title).toBe(posts[0].title)
});

test('Should retrieve only posts that a user has created', async () => {

  // Should be empty first
  const result = await query(queries.GET_AUTHOR_POSTS);

  expect(result.data.postsForDashboardFeed).toHaveLength(1);
  expect(result.data.postsForDashboardFeed[0].title).toBe(posts[1].title)
});
