const User = require('../models/User')
const createToken = require('../../config/createToken')
const isTheSamePassword = require('../utils/isTheSamePassword')
const { BadRequestError } = require('../utils/CustomErrors')

class LoginController {
  async post (username, password) {
    const user = await User.findOne({ username })

    let passwordCorrect = false
    if (user !== null) {
      passwordCorrect = await isTheSamePassword(password, user.passwordHash)
    }

    if (!user || !passwordCorrect) {
      throw new BadRequestError('Invalid username or password')
    }

    const jwt = createToken(user)
    return { jwt }
  }
}

module.exports = LoginController
