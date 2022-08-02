const { AuthenticationError, UserInputError, ForbiddenError } = require('apollo-server');
const argon2 = require('argon2');

const validators = require('../validators');
// const { UserModel } = require('../models');
const AuthService = require('./AuthService');

module.exports = ({ UserModel }) => ({
  async signup(input) {
    validators.validateRegisterUserInput(input);

    const user =
      await UserModel.findByEmail(input.email) ||
      await UserModel.findOne(input.username);

    if (user && user.email.toLowerCase() === input.email.toLowerCase()) {
      throw new UserInputError('Email is already in use.');
    }

    if (user && user.username.toLowerCase() === input.username.toLowerCase()) {
      throw new UserInputError('Username is already in use.');
    }

    const newUser = await UserModel.create({
      username: input.username,
      email: input.email,
      password: await argon2.hash(input.password),
      role: input.role,
    });

    newUser.token = AuthService.generateToken(newUser.id);
    // TODO: SEND HTTP-ONLY COOKIE AND WIRE REFRESH TOKEN RESOLVER/ENDPOINT

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

  async logout(id, reqUser) {
    const user = await UserModel.findById(id);

    if (!user) {
      throw new AuthenticationError('Cannot find user with that id.');
    }

    if (!AuthService.isAuthorized(reqUser, id, [AuthService.isSameUser, AuthService.isAdmin])) {
      throw new ForbiddenError('You are not authorized to perform this action.');
    }

    // TODO: implement refresh tokens
    // await UserModel.update(id, { token: null });

    return user;
  },

  async update(userId, input, reqUser) {
    validators.validateUpdateUserInput(input);

    // Must be logged-in in order to perform this action
    if (!AuthService.isAuthenticated(reqUser)) {
      throw new AuthenticationError('You must be logged in to perform this action.');
    }

    // Must be same user or an admin in order to perform this action
    if (!AuthService.isAuthorized(reqUser, userId, [AuthService.isAuthor, AuthService.isAdmin])) {
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

    // Must be same user or an admin in order to perform this action
    if (!AuthService.isAuthorized(reqUser, userId, [AuthService.isAuthor, AuthService.isAdmin])) {
      throw new ForbiddenError('You are not authorized to perform this action.');
    }

    const deletedUser = await UserModel.delete(userId);

    return deletedUser;
  },

  async getUserNotifications(userId, reqUser) {

    if (!AuthService.isAuthorized(reqUser, userId, [AuthService.isSameUser, AuthService.isAdmin])) {
      throw new ForbiddenError('You are not authorized to perform this action.');
    }

    const notifications = await UserModel.getUserNotifications(userId);

    if (notifications === undefined || notifications === null) {
      throw new UserInputError('Cannot find user with that id.');
    }

    return notifications;
  },

  async deleteNotification(notificationId, reqUser) {

    const { isAuthor, isAdmin } = AuthService;

    if (!AuthService.isAuthenticated(reqUser)) {
      throw new AuthenticationError('You must be logged in to perform this action.');
    }

    return await UserModel.deleteNotification(notificationId);
  },

  async findById(id, reqUser) {
    const { isSameUser, isAdmin } = AuthService;
    const user = await UserModel.findById(id);

    if (!user) {
      return new UserInputError('Cannot find user with that id.');
    }

    // TODO: setup private profiles
    if (user.isPrivate && !AuthService.isAuthorized(reqUser, id, [isSameUser, isAdmin])) {
      throw new ForbiddenError('You are not authorized to perform this action.');
    }

    return user;
  },

  async findUsers(query) {
    return await UserModel.findMany(query);
  },

  async getLikedPosts(reqUser, limit = 10, skip = 0) {

    if (!AuthService.isAuthenticated(reqUser)) {
      throw new AuthenticationError('You must be logged in to perform this action.');
    }

    return await UserModel.getLikedPosts(reqUser.id, limit, skip);
  },

  async getUserPosts(reqUser, limit = 10, skip = 0) {

    if (!AuthService.isAuthenticated(reqUser)) {
      throw new AuthenticationError('You must be logged in to perform this action.');
    }

    return await UserModel.getUserPosts(reqUser.id, limit, skip);
  },

  async getUserComments(userId) {
    return await UserModel.getUserComments(id);
  },
});
