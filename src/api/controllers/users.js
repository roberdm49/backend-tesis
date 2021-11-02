const User = require('../models/User')
const getHashedPassword = require('../utils/getHashedPassword')
const getAvatarStoredUrl = require('../utils/getAvatarStoredUrl')
const checkIfThereIsSomeErrorInTheSigninBody = require('../utils/checkIfThereIsSomeErrorInTheSigninBody')
const { BadRequestError, ValidationError } = require('../utils/CustomErrors')

class UsersController {
  async get () {
    return await User.find({})
  }

  async post (data, file) {
    const { name, lastname, username, password, email, role } = data

    const result = checkIfThereIsSomeErrorInTheSigninBody(data)
    if (result.error) {
      throw new BadRequestError(result.error)
    }

    const userFound = await User.findOne({ username })
      .then(userFound => userFound)

    if (userFound) {
      throw new ValidationError('The username already exists')
    }

    const passwordHash = await getHashedPassword(password)

    const avatar = await getAvatarStoredUrl(file)

    const userData = {
      name,
      lastname,
      username,
      passwordHash,
      email,
      avatar,
      role
    }

    const userDB = new User(userData)
    await userDB.save()
  }
}

module.exports = UsersController
