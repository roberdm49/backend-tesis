const { sign } = require('jsonwebtoken');

const createTokens = (user) => {
  const { id, username, name, lastname, avatar, role } = user;
  const authorization = sign({ id, username, name, lastname, avatar, role }, 'jwtsecretplschange'); //TODO: change this for an ENV variable

  return authorization;
};

module.exports = { createTokens };
