const signinRouter = require('express').Router()
const User = require('../models/User')
const checkIfThereIsSomeErrorInTheBody = require('../utils/checkIfThereIsSomeErrorInTheBody')

signinRouter.post('/', (request, response, next) => {
  const {
    name,
    lastname,
    username,
    password,
    // avatar,
    email,
    role
  } = request.body

  const result = checkIfThereIsSomeErrorInTheBody(request.body)
  if (result.error) {
    return response.status(400).json({ error: result.error })
  }

  User.findOne({ username })
    .then(userFound => {
      if (userFound) {
        return response.status(409).json({ error: 'The user already exists' })
      }
      const userData = {
        name,
        lastname,
        username,
        passwordHash: password,
        email,
        avatar: null,
        role
      }
      const userDB = new User(userData)
      userDB.save()
        .then(() => response.status(201).end())
        .catch(err => next(err))
    })
    .catch(err => {
      return next(err)
    })
})

module.exports = signinRouter
