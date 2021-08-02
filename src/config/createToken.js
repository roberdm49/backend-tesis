const { sign } = require('jsonwebtoken');

const createTokens = (user) => {
  const { id, username, name, lastname, avatar, role } = user;
  const authorization = sign({ id, username, name, lastname, avatar: avatar || '', role }, 'jwtsecretplschange'); //TODO: change this for an ENV variable
  console.log(authorization)

  return authorization;
};

module.exports = { createTokens };
