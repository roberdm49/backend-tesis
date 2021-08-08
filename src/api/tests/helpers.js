const supertest = require('supertest')
const { app } = require('../../index')
// api is async
const api = supertest(app)

const initialUsers = [
  {
    name: 'Roberto',
    lastname: 'Marcos',
    username: 'roberto',
    password: 'roberto123',
    email: 'robertomarcos123@hotmail.com',
    avatar: null,
    role: 'techinal'
  },
  {
    name: 'Nacho',
    lastname: 'Larrabide',
    username: 'nacho',
    password: 'nacho123',
    email: 'nacholarrabide123@hotmail.com',
    avatar: null,
    role: 'admin'
  }
]

const validUser = {
  name: 'Roberto',
  lastname: 'Marcos',
  username: 'roberto',
  password: 'roberto123',
  email: 'robertomarcos123@hotmail.com',
  avatar: null,
  role: 'techinal'
}

const invalidUser = {
  name: 'Roberto',
  lastname: 'Marcos',
  username: 'roberto',
  password: 'roberto123',
  email: 'robertomarcos123@hotmail.com',
  avatar: null
}

const getAllUsernamesFromUsers = response => {
  return response.body.map(user => user.username)
}

module.exports = {
  initialUsers,
  api,
  validUser,
  invalidUser,
  getAllUsernamesFromUsers
}
