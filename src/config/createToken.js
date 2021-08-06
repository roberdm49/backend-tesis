const { sign } = require('jsonwebtoken')

const createTokens = (user) => {
  const { id, username, name, lastname, avatar, email, role } = user
  const authorization = sign({ id, username, name, lastname, avatar, email, role }, 'jwtsecretplschange') // TODO: change this for an ENV variable

  return authorization
}

module.exports = createTokens
