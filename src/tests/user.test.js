const { server, services } = require('.');
const queries = require('./fixtures/queries');

test('Should return all users', async () => {

  const mockFindUsers = jest.fn(() => [
    {
      id: 123,
      username: 'Mary',
      email: 'mary@example.com',
      password: 'maryPassword123'
    },
    {
      id: 456,
      username: 'Mozart',
      email: 'mozart@example.com',
      password: 'mozartPassword123'
    },
  ]);

  services.user.findUsers = mockFindUsers;

  const result = await server.executeOperation({
    query: queries.GET_ALL_USERS
  });

  expect(result.errors).toBeUndefined();
  expect(result.data).not.toBeNull();
  expect(result.data.users).not.toBeUndefined();

  expect(mockFindUsers).toHaveBeenCalledWith(undefined);
});

test('Should return all posts', async () => {
  const result = await server.executeOperation({
    query: queries.GET_ALL_POSTS
  });

  expect(result.errors).toBeUndefined();
  expect(result.data).not.toBeNull();
  expect(result.data.posts).not.toBeUndefined();
});
