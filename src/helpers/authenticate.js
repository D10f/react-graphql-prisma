const { AuthenticationError } = require('apollo-server');

module.exports = req => {
  try {
    const token = req.header['Authorization'] && req.header('Authorization').replace('Bearer ', '');
    req.user = token
      ? jwt.verify(token, process.env.JWT_SECRET).id
      : null
  } catch (err) {
    throw new AuthenticationError(err.message);
  }
};
