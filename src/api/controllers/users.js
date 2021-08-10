const usersRouter = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const checkIfThereIsSomeErrorInTheSigninBody = require('../utils/checkIfThereIsSomeErrorInTheSigninBody')

usersRouter.get('/', (request, response, next) => {
  User.find({})
    .then(usersFound => {
      return response.json(usersFound)
    })
    .catch(err => {
      return next(err)
    })
})

usersRouter.post('/', async (request, response, next) => {
  const {
    name,
    lastname,
    username,
    password,
    // avatar,
    email,
    role
  } = request.body

  const result = checkIfThereIsSomeErrorInTheSigninBody(request.body)
  if (result.error) {
    return response.status(400).json({ error: result.error })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const userData = {
    name,
    lastname,
    username,
    passwordHash,
    email,
    avatar: null,
    role
  }

  const userDB = new User(userData)
  userDB.save()
    .then(() => response.status(201).end())
    .catch(err => next(err))
})

module.exports = usersRouter
