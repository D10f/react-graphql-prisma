const { queries, mutations } = require('./fixtures/comments');
const { queries: userQueries } = require('./fixtures/users');
const { setupServer, setupDatabase, teardownDatabase } = require('./fixtures/server');
const { comments, users, posts, tokens } = require('./fixtures/seedData');

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

test('Should create a new comment', async () => {

  const newCommentInput = {
    text: "Hello World",
    postId: `${posts[1].id}`
  };

  const result = await mutate(mutations.CREATE_COMMENT, {
    variables: { input: newCommentInput }
  });

  /* Assert that a comment is created with an id, and that the post has a new comment (initially 1) */
  expect(result.data.createComment).toHaveProperty('id', expect.any(String));
  expect(result.data.createComment.post.commentCount).toBe(2);
});


test('Should NOT create a new comment if not authenticated', async () => {

  setOptions({ request: {} });

  const newCommentInput = {
    text: "Hello World",
    postId: `${posts[1].id}`
  };

  const result = await mutate(mutations.CREATE_COMMENT, {
    variables: { input: newCommentInput }
  });

  expect(result.errors[0].message).toBe('You must be logged in to perform this action.');
});


test('Should NOT create a new comment due to invalid format', async () => {
  const newCommentInput = {
    text: "",
    postId: `${posts[1].id}`
  };

  const result = await mutate(mutations.CREATE_COMMENT, {
    variables: { input: newCommentInput }
  });

  expect(result.errors[0].extensions.errors[0].message).toBe('A comment must have between 1 and 1000 characters.');
});

test('Should create a notification when a comment is added', async () => {
  const newCommentInput = {
    text: "Hello World",
    postId: `${posts[2].id}`
  };

  const result = await mutate(mutations.CREATE_COMMENT, {
    variables: { input: newCommentInput }
  });

  expect(result.data.createComment.post.commentCount).toBe(2);

  /* Can only read others notifications as admin */
  setOptions({
    request: {
      headers: {
        authorization: `Bearer ${tokens.admin}`,
      }
    }
  });

  const result2 = await query(userQueries.GET_NOTIFICATIONS, {
    variables: { id: users[2].id }
  });

  expect(result2.data.getUserNotifications).toHaveLength(1);
});

test('Should update a existing comment', async () => {
  const updateCommentInput = {
    text: "Around the world!11",
  };

  const result = await mutate(mutations.UPDATE_COMMENT, {
    variables: { id: `${comments[1].id}`, input: updateCommentInput }
  });

  expect(result.data.updateComment.text).toBe(updateCommentInput.text);
});


test('Should NOT update comments if unauthorized', async () => {

  setOptions({ request: {} });

  const updateCommentInput = {
    text: "Around the world!11",
  };

  const result = await mutate(mutations.UPDATE_COMMENT, {
    variables: { id: `${comments[2].id}`, input: updateCommentInput }
  });

  expect(result.errors[0].message).toBe('You must be logged in to perform this action.');
});


test('Should NOT update another user\'s comment if not an admin', async () => {
  const updateCommentInput = {
    text: "Around the world!11",
  };

  const result = await mutate(mutations.UPDATE_COMMENT, {
    variables: { id: `${comments[2].id}`, input: updateCommentInput }
  });

  expect(result.errors[0].message).toBe('You are not authorized to perform this action.');

  /* Repeat but now logged in as an admin */
  setOptions({
    request: {
      headers: {
        authorization: `Bearer ${tokens.admin}`,
      }
    }
  });

  const result2 = await mutate(mutations.UPDATE_COMMENT, {
    variables: { id: `${comments[2].id}`, input: updateCommentInput }
  });

  /* Assert that update was successful */
  expect(result2.data.updateComment.text).toBe(updateCommentInput.text);
});


test('Should NOT update a comment due to invalid format', async () => {
  const updateCommentInput = {
    text: "",
  };

  const result = await mutate(mutations.UPDATE_COMMENT, {
    variables: { id: `${comments[2].id}`, input: updateCommentInput }
  });

  expect(result.errors[0].extensions.errors[0].message).toBe('A comment must have between 1 and 1000 characters.');
});


test('Should delete comment', async () => {

  const result = await mutate(mutations.DELETE_COMMENT, {
    variables: { id: `${comments[1].id}` }
  });

  expect(result.data.deleteComment.post.commentCount).toBe(0);
});


test('Should NOT delete another user\'s comment if not an admin', async () => {

  const result = await mutate(mutations.DELETE_COMMENT, {
    variables: { id: `${comments[2].id}` }
  });

  expect(result.errors[0].message).toBe('You are not authorized to perform this action.');

  /* Repeat but now logged in as an admin */
  setOptions({
    request: {
      headers: {
        authorization: `Bearer ${tokens.admin}`,
      }
    }
  });

  const result2 = await mutate(mutations.DELETE_COMMENT, {
    variables: { id: `${comments[2].id}` }
  });

  expect(result2.data.deleteComment.id).toBe(`${comments[2].id}`);
});
