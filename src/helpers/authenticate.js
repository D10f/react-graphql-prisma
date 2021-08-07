const { AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');

module.exports = async (req, conn) => {
  try {
    // NOTE: Apollo Server converts headers to lowercase - "Authorization" becomes "authorization"
    const token = req.headers['authorization'] && req.header('authorization').replace('Bearer ', '');

    req.user = token
      ? await conn.user.findUnique({ where: { id: jwt.verify(token, process.env.JWT_SECRET).id }})
      : null

  } catch (err) {
    throw new AuthenticationError(err.message);
  }
};
