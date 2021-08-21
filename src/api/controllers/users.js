const usersRouter = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const uploadAvatar = require('../middlewares/stackoverfloAWS')
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

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const uploadedAvatar = !avatar ? avatar : await uploadAvatar(avatar)
  let url = null

  if (uploadedAvatar) {
    const host = uploadedAvatar.service.endpoint.host
    const imagePath = uploadedAvatar.service.config.params.Key
    url = `https://${process.env.AWS_BUCKET_NAME}.${host}/${imagePath}`
  }

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
