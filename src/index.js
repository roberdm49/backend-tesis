require('dotenv').config()
require('./mongo')

const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const createToken = require('./config/createToken')
const validateToken = require('./api/middlewares/validateToken')
const User = require('./api/models/User')
const notFound = require('./api/middlewares/notFound')
const handleErrors = require('./api/middlewares/handleErrors')
const checkIfThereIsSomeErrorInTheBody = require('./api/utils/checkIfThereIsSomeErrorInTheBody')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.get('/api/users', (request, response, next) => {
  User.find({})
    .then(usersFound => {
      return response.json(usersFound)
    })
    .catch(err => {
      return next(err)
    })
})

app.post('/api/login', (request, response, next) => {
  const { username, password } = request.body
  User.findOne({ username, password })
    .then(userFound => {
      if (!userFound) {
        return response.status(400).json({ error: 'User or password incorrect' })
      }
      const jwt = userFound ? createToken(userFound) : null
      return response.status(202).json({ jwt })
    })
    .catch(err => {
      return next(err)
    })
})

app.post('/api/signin', (request, response, next) => {
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
      const userData = { name, lastname, username, password, email, avatar: null, role }
      const userDB = new User(userData)
      userDB.save()
        .then(() => response.status(201).end())
        .catch(err => next(err))
    })
    .catch(err => {
      return next(err)
    })
})

app.post('/api/patients', validateToken, (request, response) => {
  response.json('Response from POST patients!')
})

app.get('/api/patients/:dni', validateToken, (request, response) => {
  response.json('Response from GET patients/:dni!')
})

app.put('/api/patients/:dni', validateToken, (request, response) => {
  response.json('Response from PUT patients/:dni!')
})

app.use(notFound)
app.use(handleErrors)

const PORT = process.env.PORT
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = { app, server }
