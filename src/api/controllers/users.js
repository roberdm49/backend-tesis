const usersRouter = require('express').Router()
const User = require('../models/User')

usersRouter.get('/', (request, response, next) => {
  User.find({})
    .then(usersFound => {
      return response.json(usersFound)
    })
    .catch(err => {
      return next(err)
    })
})

module.exports = usersRouter
