const mongoose = require('mongoose')
const { server } = require('../../index')
const User = require('../models/User')
const {
  initialUsers,
  api,
  validUser,
  invalidUser,
  getAllUsernamesFromUsers
} = require('./helpers')

describe('GET /api/users', () => {
  let response

  beforeEach(async () => {
    await User.deleteMany({})

    for (const user of initialUsers) {
      const newUser = new User(user)
      await newUser.save()
    }

    response = await api.get('/api/users')
  })

  it('users are returned as json', async () => {
    expect(response.status).toBe(200)
    expect(response.get('Content-Type')).toMatch(/application\/json/)
  })

  it('there are so many users as the length of the initial users', async () => {
    expect(response.body).toHaveLength(initialUsers.length)
  })

  it('there is an user with the username "roberto"', async () => {
    const usernames = getAllUsernamesFromUsers(response)
    expect(usernames).toContain('roberto')
  })
})

describe('POST /api/signin', () => {
  beforeEach(async () => {
    await User.deleteMany({})
  })

  it('a valid user can be added', async () => {
    await api
      .post('/api/signin')
      .send(validUser)
      .expect(201)

    const response = await api.get('/api/users')

    expect(response.body).toHaveLength(1)
  })

  it('a user without some required field cannot be added', async () => {
    await api
      .post('/api/signin')
      .send(invalidUser)
      .expect(400)

    const response = await api.get('/api/users')

    expect(response.body).toHaveLength(0)
  })
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})
