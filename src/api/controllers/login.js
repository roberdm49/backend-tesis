const loginRouter = require('express').Router()
const User = require('../models/User')
const createToken = require('../../config/createToken')

loginRouter.post('/', (request, response, next) => {
  const { username, password } = request.body
  User.findOne({ username })
    .then(userFound => {
      if (!userFound) { // TODO: hashed password validation
        return response.status(400).json({ error: 'User or password incorrect' })
      }
      const jwt = userFound ? createToken(userFound) : null
      return response.status(202).json({ jwt })
    })
    .catch(err => {
      return next(err)
    })
})

module.exports = loginRouter
