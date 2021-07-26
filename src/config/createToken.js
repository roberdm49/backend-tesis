const { sign } = require('jsonwebtoken');

const createTokens = (user) => {
  const { id, username, name, lastname, avatar, role } = user;
  const accessToken = sign({ id, username, name, lastname, avatar, role }, 'jwtsecretplschange');

  return accessToken;
};

module.exports = { createTokens };
