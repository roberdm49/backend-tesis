const supertest = require('supertest')
const { app } = require('../../index')
// api is async
const api = supertest(app)

const initialUsers = [
  {
    name: 'Roberto',
    lastname: 'Marcos',
    username: 'roberto',
    password: 'Roberto123',
    repeatPassword: 'Roberto123',
    email: 'robertomarcos123@hotmail.com',
    avatar: null,
    role: 'technical'
  },
  {
    name: 'Nacho',
    lastname: 'Larrabide',
    username: 'nacho',
    password: 'Nacho123',
    repeatPassword: 'Nacho123',
    email: 'nacholarrabide123@hotmail.com',
    avatar: null,
    role: 'admin'
  }
]

const validUser = {
  name: 'Roberto',
  lastname: 'Marcos',
  username: 'roberto',
  password: 'Roberto123!',
  repeatPassword: 'Roberto123!',
  email: 'robertomarcos123@hotmail.com',
  avatar: null,
  role: 'technical'
}

const invalidUser = {
  name: 'Roberto',
  lastname: 'Marcos',
  username: 'roberto',
  password: 'roberto123',
  repeatPassword: 'roberto123',
  email: 'robertomarcos123@hotmail.com',
  avatar: null
}

const validLoginCredentials = {
  username: validUser.username,
  password: validUser.password
}

const invalidLoginCredentials = {
  username: 'abcdefghijklmno',
  password: 'pqrstuvwxyz'
}

const validPatient = {
  dni: '1234567',
  lastname: 'marcos',
  name: 'roberto',
  gender: 'male',
  birthDate: new Date(),
  checkDate: new Date(),
  diabetesType: '1',
  images: []
}

const getAllUsernamesFromUsers = response => {
  return response.body.map(user => user.username)
}

module.exports = {
  initialUsers,
  api,
  validUser,
  invalidUser,
  validLoginCredentials,
  invalidLoginCredentials,
  validPatient,
  getAllUsernamesFromUsers
}
