const loginRouter = require('express').Router()
const User = require('../models/User')
const createToken = require('../../config/createToken')
const isTheSamePassword = require('../utils/isTheSamePassword')

loginRouter.post('/', async (request, response, next) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })

  const passwordCorrect = user === null
    ? false
    : await isTheSamePassword(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(400).json({
      error: 'Invalid user or password'
    })
  }

  const jwt = createToken(user)
  return response.status(202).json({ jwt })
})

module.exports = loginRouter
