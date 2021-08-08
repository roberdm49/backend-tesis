const { sign } = require('jsonwebtoken')

const createTokens = (user) => {
  const { id, username, name, lastname, avatar, email, role } = user
  const authorization = sign({ id, username, name, lastname, avatar, email, role }, process.env.JWT_PASSWORD)

  return authorization
}

module.exports = createTokens
