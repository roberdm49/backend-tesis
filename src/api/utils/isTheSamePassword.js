const bcrypt = require('bcrypt')

const isTheSamePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword)
}

module.exports = isTheSamePassword
