const mongoose = require('mongoose')
const supertest = require('supertest')
const { app, server } = require('../../index')
const User = require('../models/User')

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

describe('GET /api/users', () => {
  let response

  beforeEach(async () => {
    await User.deleteMany({})
    const user1 = new User(initialUsers[0])
    await user1.save()
    const user2 = new User(initialUsers[1])
    await user2.save()

    response = await api.get('/api/users')
  })

  it('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  it('there are two users', async () => {
    expect(response.body).toHaveLength(initialUsers.length)
  })

  it('there is an user with the username "roberto"', async () => {
    const usernames = response.body.map(user => user.username)
    expect(usernames).toContain('roberto')
  })
})

describe('POST /api/signin', () => {
  beforeEach(async () => {
    await User.deleteMany({})
  })

  it('a valid user can be added', async () => {
    const newUser = {
      name: 'Roberto',
      lastname: 'Marcos',
      username: 'roberto',
      password: 'roberto123',
      email: 'robertomarcos123@hotmail.com',
      avatar: null,
      role: 'techinal'
    }

    await api
      .post('/api/signin')
      .send(newUser)
      .expect(201)

    const response = await api.get('/api/users')

    expect(response.body).toHaveLength(1)
  })

  it('a user without some required field cannot be added', async () => {
    const newUser = {
      name: 'Roberto',
      lastname: 'Marcos',
      username: 'roberto',
      password: 'roberto123',
      email: 'robertomarcos123@hotmail.com',
      avatar: null
    }

    await api
      .post('/api/signin')
      .send(newUser)
      .expect(400)

    const response = await api.get('/api/users')

    expect(response.body).toHaveLength(0)
  })
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})
