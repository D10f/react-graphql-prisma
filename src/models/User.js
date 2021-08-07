const { AuthenticationError, UserInputError, ForbiddenError } = require('apollo-server');
const jwt = require('jsonwebtoken');
const argon2 = require('argon2');
const validators = require('../validators');

const generateToken = id => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

class User {
  constructor(req, prisma) {
    this.user = req.user;
    this.db = prisma;
  }

  async findById(id) {
    return await this.db.user.findUnique({ where: { id }});
  }

  async findUsers(query = '') {
    return query
      ? await this.db.user.findMany({ where: { username: query }})
      : await this.db.user.findMany()
  }

  async getLikedPosts(id) {
    const result = await this.db.user.findUnique({
      where: { id },
      select: { likes: true }
    });
    return result.likes;
  }

  async registerUser({ username, email, password, confirmPassword, role }) {
    validators.validateRegisterUserInput({ username, email, password, confirmPassword, role });

    const user = await this.db.user.findUnique({ where: { email }});

    if (user && user.email === email) {
      throw new AuthenticationError('Email is already in use.');
    }

    if (user && user.username === username) {
      throw new AuthenticationError('Username is already in use.');
    }

    const newUser = await this.db.user.create({
      data: {
        username,
        email,
        password: await argon2.hash(password),
        role
      }
    });

    const token = generateToken(newUser.id);

    return {
      ...newUser,
      token
    };
  };

  async loginUser(username, password) {
    const user = await this.db.user.findUnique({ where: { username }});

    if (!user) {
      throw new AuthenticationError('Invalid username and/or password.');
    }

    const passwordMatch = await argon2.verify(user.password, password);

    if (!passwordMatch) {
      throw new AuthenticationError('Invalid username and/or password.');
    }

    const token = generateToken(user.id);

    return {
      ...user,
      token
    };
  };

  async updateUser(id, input) {
    // Must be logged-in in order to perform this action
    if (!this.user) {
      throw new AuthenticationError('You must be logged in to perform this action.');
    }

    // Must be same user or an admin in order to perform this action
    if (this.user.id !== id && this.user.role !== 'ADMIN') {
      throw new ForbiddenError('You are not authorized to perform this action.');
    }

    // Only an admin can update a user's role
    if (input.role && this.user.role !== 'ADMIN') {
      throw new ForbiddenError('You are not authorized to perform this action.');
    }

    validators.validateUpdateUserInput(input);

    // If updating another user's profile (only as an admin) check if that user exists first.
    const userExists = this.user.id === id
      ? this.user
      : await this.db.findById(id);

    if (!userExists) {
      throw new UserInputError('No user found with that id.');
    }

    // If password is provided, hash it before update
    if (input.password) {
      input.password = await argon2.hash(input.password);
    }

    return await this.db.user.update({
      where: { id },
      data: input
    });
  };

  async deleteUser(id) {
    if (!this.user) {
      throw new AuthenticationError('You must be logged in to perform this action.');
    }

    if (this.user.id !== id && this.user.role !== 'ADMIN') {
      throw new ForbiddenError('You are not authorized to perform this action.');
    }

    // Retrieve user data, including all posts and comments
    const user = await this.db.user.findUnique({
      where: { id },
      include: { posts: true, comments: true }
    });

    if (!user) {
      throw new UserInputError('No user found with that id.');
    }

    // Get all Ids of posts and comments by that user
    const postsByUser = user.posts.map(post => post.id);
    const commentsByUser = user.comments.map(comment => comment.id);

    // Delete comments, posts and user in a single transaction due to closely coupled data
    await this.db.$transaction([
      this.db.comment.deleteMany({ where: { id: { in: commentsByUser } }}),
      this.db.post.deleteMany({ where: { id: { in: postsByUser } }}),
      this.db.user.delete({ where: { id }})
    ]);

    return user;
  };
}

module.exports = User;
