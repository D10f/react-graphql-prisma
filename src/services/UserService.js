const { AuthenticationError, ForbiddenError } = require('apollo-server');
const argon2 = require('argon2');

const validators = require('../validators');
const { UserModel } = require('../models');
const AuthService = require('./AuthService');

module.exports = {
  async signup(input) {
    validators.validateRegisterUserInput(input);

    const user = await UserModel.findByEmail(input.email);

    if (user && user.email === input.email) {
      throw new AuthenticationError('Email is already in use.');
    }

    if (user && user.username === input.username) {
      throw new AuthenticationError('Username is already in use.');
    }

    const newUser = await UserModel.create({
      username: input.username,
      email: input.email,
      password: await argon2.hash(input.password),
      role: input.role,
    });

    newUserModel.token = AuthService.generateToken(newUserModel.id);

    return newUser;
  },

  async login(username, password) {
    const user = await UserModel.findOne(username);

    if (!user) {
      throw new AuthenticationError('Invalid username and/or password.');
    }

    const passwordMatch = await argon2.verify(user.password, password);

    if (!passwordMatch) {
      throw new AuthenticationError('Invalid username and/or password.');
    }

    user.token = AuthService.generateToken(user.id);
    return user;
  },

  async update(userId, input, reqUser) {
    validators.validateUpdateUserInput(input);

    // Must be logged-in in order to perform this action
    if (!AuthService.isAuthenticated(reqUser)) {
      throw new AuthenticationError('You must be logged in to perform this action.');
    }

    // Must be same user or an admin in order to perform this action
    if (!AuthService.isAuthorized(reqUser, userId, [ AuthService.isSameUser, AuthService.isAdmin ])) {
      throw new ForbiddenError('You are not authorized to perform this action.');
    }

    // Only an admin can update a user's role
    if (input.role && !AuthService.isAdmin(reqUser)) {
      throw new ForbiddenError('You are not authorized to perform this action.');
    }

    // If password is provided, hash it before update
    if (input.password) {
      input.password = await argon2.hash(input.password);
    }

    const updatedUser = await UserModel.update(userId, input);

    return updatedUser;
  },

  async delete(userId, reqUser) {

    if (!AuthService.isAuthenticated(reqUser)) {
      throw new AuthenticationError('You must be logged in to perform this action.');
    }

    if (!AuthService.isAdmin(reqUser)) {
      throw new ForbiddenError('You are not authorized to perform this action.');
    }

    const deletedUser = await UserModel.delete(userId);

    return deletedUser;
  },

  async findById(id) {
    return await UserModel.findById(id);
  },

  async findUsers(query) {
    return await UserModel.findMany(query);
  },

  async getUserLikes(user) {
    return await UserModel.getLikedPosts(user);
  },

  async getUserPosts(user) {
    return await UserModel.getUserPosts(user.id);
  },

  async getUserComments(userId) {
    return await UserModel.getUserComments(id);
  },
};
