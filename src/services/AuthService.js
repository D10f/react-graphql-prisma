const { AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');

module.exports = {

  generateToken(id) {
    return jwt.sign(
      { id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
  },

  verifyToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      this.error = 'TokenExpiredError: token has expired, please login again.'
      return null;
    }
  },

  isAuthenticated(user) {
    return !!user;
  },

  isAuthorized(user, ownerId, permissions) {
    if (!this.isAuthenticated(user)) {
      throw new AuthenticationError('You must be logged in to perform this action.');
    }

    return permissions.some(authFn => authFn(user, ownerId));
  },

  isAdmin(user) {
    return user.role === 'ADMIN';
  },

  // isSameUser(user, ownerId) {
  //   return user.id === ownerId;
  // },

  isAuthor(user, authorId) {
    return user.id === authorId;
  },

  hasReadPermission(user, ownerId) {
    // Check user's permission set
    // Compare against ownerId -> can be of a post, comment or profile
  },

  hasWritePermission(user, ownerId) {
    // Check user's permission set
    // Compare against ownerId -> can be of a post, comment or profile
  },
};
