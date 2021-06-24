const { sign } = require('jsonwebtoken');

const createTokens = (user) => {
  const { username } = user;
  const accessToken = sign({ username }, 'jwtsecretplschange');

  return accessToken;
};

module.exports = { createTokens };
