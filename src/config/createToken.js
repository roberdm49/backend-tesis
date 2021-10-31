const { sign } = require('jsonwebtoken')
const { JWT_PASSWORD } = process.env

const createTokens = (user) => {
  const { id, username, name, lastname, avatar, email, role } = user
  const authorization = sign({ id, username, name, lastname, avatar, email, role }, JWT_PASSWORD)

  return authorization
}

module.exports = createTokens
