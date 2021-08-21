const usersRouter = require('express').Router()
const User = require('../models/User')
const getHashedPassword = require('../utils/getHashedPassword')
const getAvatarStoredUrl = require('../utils/getAvatarStoredUrl')
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
    avatar,
    email,
    role
  } = request.body

  const result = checkIfThereIsSomeErrorInTheSigninBody(request.body)
  if (result.error) {
    return response.status(400).json({ error: result.error })
  }

  const userFound = await User.findOne({ username })
    .then(userFound => userFound)
    .catch(err => next(err))

  if (userFound) {
    return response.status(409).json({ error: 'The username already exists' })
  }

  const passwordHash = await getHashedPassword(password)
  const url = await getAvatarStoredUrl(avatar)

  const userData = {
    name,
    lastname,
    username,
    passwordHash,
    email,
    avatar: url,
    role
  }

  const userDB = new User(userData)
  userDB.save()
    .then(() => response.status(201).end())
    .catch(err => next(err))
})

module.exports = usersRouter
