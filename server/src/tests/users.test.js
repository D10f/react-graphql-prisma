const { queries, mutations } = require('./fixtures/users');
const { setupServer, setupDatabase, teardownDatabase } = require('./fixtures/server');
const { users, tokens } = require('./fixtures/data');

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
        authorization: `Bearer ${tokens.token2}`,
      }
    }
  });
});

afterEach(async () => await teardownDatabase());

test('Should signup a new user', async () => {

  const newUser = {
    username: "Delia",
    email: "delia@example.com",
    password: "deliaInWonderland",
    confirmPassword: "deliaInWonderland",
    role: "ADMIN"
  };

  const result = await mutate(mutations.REGISTER_USER, {
    variables: { input: newUser }
  });

  /* Assert that new user is created correctly with an id, token and hashed password */
  expect(result.data.registerUser).toHaveProperty('id', expect.any(String));
  expect(result.data.registerUser).toHaveProperty('token', expect.any(String));
  expect(result.data.registerUser.password.startsWith('$argon')).toBe(true);
});



test('Should NOT signup a new user due to already existing email', async () => {

  const newUser = {
    username: users[0].username,
    email: users[0].email,
    password: users[0].password,
    confirmPassword: users[0].password,
    role: users[0].role,
  };

  const result = await mutate(mutations.REGISTER_USER, {
    variables: { input: newUser }
  });

  /* Assert that new user is not created if email already exists*/
  expect(result.errors[0].message).toEqual('Email is already in use.');
});



test('Should NOT signup a new user due to invalid formats', async () => {

  const passwordMismatch = {
    username: "Delia",
    email: "example.com",
    password: "dln",
    confirmPassword: "eia",
  };

  const result = await mutate(mutations.REGISTER_USER, {
    variables: { input: passwordMismatch }
  });

  expect(result.errors[0].extensions.errors).toHaveLength(3);
  expect(result.errors[0].extensions.errors[0].message).toBe('You must provide a valid email address.');
  expect(result.errors[0].extensions.errors[1].message).toBe('Passwords must be at least 8 characters long.');
  expect(result.errors[0].extensions.errors[2].message).toBe('Passwords do not match.');
});



test('Should login using an existing user\'s credentials', async () => {

  const { username } = users[2];

  const result = await mutate(mutations.LOGIN_USER, {
    variables: { username, password: 'cinderellaInWonderland' }
  });

  /* Assert that users can login correctly, receiving an authentication token back */
  expect(result.data.loginUser).toHaveProperty('id', expect.any(String));
  expect(result.data.loginUser).toHaveProperty('token', expect.any(String));
});


test('Should NOT login using a invalid credentials', async () => {

  const result = await mutate(mutations.LOGIN_USER, {
    variables: {
      username: users[0].username,
      password: users[0].password,
    }
  });

  // This is an argon2 error because the user[0] password is not hashed in the mock database
  expect(result.errors[0].message).toBe('pchstr must contain a $ as first char');

  const result2 = await mutate(mutations.LOGIN_USER, {
    variables: {
      username: users[2].username,
      password: 'completelyFakePassword'
    }
  });

  const result3 = await mutate(mutations.LOGIN_USER, {
    variables: {
      username: 'completelyFakeUsername',
      password: 'completelyFakePassword'
    }
  });

  expect(result2.errors[0].message).toBe('Invalid username and/or password.');
  expect(result3.errors[0].message).toBe('Invalid username and/or password.');
});

test('Should update an existing user\s data', async () => {

  const updates = {
    password: 'myNewPassword'
  };

  const result = await mutate(mutations.UPDATE_USER, {
    variables: { targetUserId: users[2].id, input: updates }
  });

  expect(result.data.updateUser.password.startsWith('$argon')).toBe(true);
});

test('Should NOT update due to unauthenticated/unauthorized user', async () => {

  // Without being authenticated
  setOptions({ request: {} });

  let updates = {
    password: 'myNewPassword',
    role: 'ADMIN'
  };

  const result = await mutate(mutations.UPDATE_USER, {
    variables: { targetUserId: users[0].id, input: updates }
  });

  /* Trying to update user without logging in, returns an authentication error */
  expect(result.errors[0].message).toBe('You must be logged in to perform this action.');

  // Logged in as a non-admin user
  setOptions({
    request: {
      headers: {
        authorization: `Bearer ${tokens.token2}`,
      }
    }
  });

  /* Trying to update another user's profile without being admin, returns a forbidden error */
  const result2 = await mutate(mutations.UPDATE_USER, {
    variables: { targetUserId: users[0].id, input: updates }
  });

  /* Trying to update a user's own role needs admin permissions, returns a forbidden error */
  const result3 = await mutate(mutations.UPDATE_USER, {
    variables: { targetUserId: users[2].id, input: updates }
  });

  expect(result2.errors[0].message).toBe('You are not authorized to perform this action.');
  expect(result3.errors[0].message).toBe('You are not authorized to perform this action.');
});


test('Should NOT update due to invalid format', async () => {

  const updates = {
    username: 'a',
    email: 'example.com',
    password: 'short'
  };

  const result = await mutate(mutations.UPDATE_USER, {
    // variables: { targetUserId: loginData.data.loginUser.id, input: updates }
    variables: { targetUserId: users[2].id, input: updates }
  });

  expect(result.errors[0].extensions.errors).toHaveLength(3);
  expect(result.errors[0].extensions.errors[0].message).toBe('You must provide a username at least 2 characters long.');
  expect(result.errors[0].extensions.errors[1].message).toBe('You must provide a valid email address.');
  expect(result.errors[0].extensions.errors[2].message).toBe('Passwords must be at least 8 characters long.');
});


test('Should delete logged in user', async () => {

  const result = await mutate(mutations.DELETE_USER, {
    // variables: { id: loginData.data.loginUser.id }
    variables: { id: users[2].id }
  });

  // Cast id into string which is what's returned from the server
  expect(result.data.deleteUser).toEqual({
    id: `${users[2].id}`,
    username: users[2].username,
    email: users[2].email,
  });

  // Querying the databse for that user should now return an empty array
  const result2 = await query(queries.GET_USERS, {
    variables: { query: users[2].username }
  });

  expect(result2.data.users).toHaveLength(0);
});

test('Should delete another user while logged in as admin', async () => {

  setOptions({
    request: {
      headers: {
        authorization: `Bearer ${tokens.token1}`,
      }
    }
  });

  const result = await mutate(mutations.DELETE_USER, {
    variables: { id: users[0].id }
  });

  // Cast id into string which is what's returned from the server
  expect(result.data.deleteUser).toEqual({
    id: `${users[0].id}`,
    username: users[0].username,
    email: users[0].email,
  });

  // Querying the databse for that user should now return an empty array
  const result2 = await query(queries.GET_USERS, {
    variables: { query: users[0].username }
  });

  expect(result2.data.users).toHaveLength(0);
});


test('Should NOT delete another user if not logged in as admin', async () => {

  const result = await mutate(mutations.DELETE_USER, {
    variables: { id: users[0].id }
  });

  // Cast id into string which is what's returned from the server
  expect(result.errors[0].message).toBe('You are not authorized to perform this action.');
});
