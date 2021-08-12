const mongoose = require('mongoose')
const { server } = require('../../index')
const User = require('../models/User')
const Patient = require('../models/Patient')
const Check = require('../models/Check')
const {
  initialUsers,
  api,
  getAllUsernamesFromUsers,
  validUser,
  invalidUser,
  validLoginCredentials,
  invalidLoginCredentials,
  validPatient
} = require('./helpers')

describe('endpoints', () => {
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

    it('users are returned as json', () => {
      expect(response.status).toBe(200)
      expect(response.get('Content-Type')).toMatch(/application\/json/)
    })

    it('there are so many users as the length of the initial users', () => {
      expect(response.body).toHaveLength(initialUsers.length)
    })

    it('there is an user with the username "roberto"', () => {
      const usernames = getAllUsernamesFromUsers(response)
      expect(usernames).toContain('roberto')
    })
  })

  describe('POST /api/users', () => {
    beforeEach(async () => {
      await User.deleteMany({})
    })

    it('a valid user can be added', async () => {
      await api
        .post('/api/users')
        .send(validUser)
        .expect(201)

      const response = await api.get('/api/users')

      expect(response.body).toHaveLength(1)
    })

    it('a user without some required field cannot be added', async () => {
      await api
        .post('/api/users')
        .send(invalidUser)
        .expect(400)

      const response = await api.get('/api/users')

      expect(response.body).toHaveLength(0)
    })

    it('creations fails with the properly statuscode if the user already exists', async () => {
      await api.post('/api/users')
        .send(validUser)
        .expect(201)

      await api.post('/api/users')
        .send(validUser)
        .expect(409)
        .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/users')
      expect(response.body).toHaveLength(1)
    })
  })

  describe('POST /api/login', () => {
    beforeEach(async () => {
      await User.deleteMany({})
      await api
        .post('/api/users')
        .send(validUser)
    })

    it('should return a valid token', async () => {
      const response = await api
        .post('/api/login')
        .send(validLoginCredentials)

      const token = response.body.jwt

      expect(token).toBeTruthy()
      expect(token).not.toBe({})
      expect(response.status).toBe(202)
    })

    it('should return the correct statuscode if the user do not exists', async () => {
      await api
        .post('/api/login')
        .send(invalidLoginCredentials)
        .expect(400)
    })
  })

  describe('POST /api/patients', () => {
    let token = ''
    let patientResponse = ''

    beforeEach(async () => {
      await User.deleteMany({})
      await Patient.deleteMany({})
      await Check.deleteMany({})

      await api
        .post('/api/users')
        .send(validUser)
      const response = await api
        .post('/api/login')
        .send(validLoginCredentials)

      token = response.body.jwt

      patientResponse = await api
        .post('/api/patients')
        .set('authorization', 'Bearer ' + token)
        .send(validPatient)
    })

    it('should add correctly a patient and return the correct statuscode', () => {
      expect(patientResponse.status).toBe(201)
    })

    it('should be only one patient in the db', async () => {
      const patients = await Patient.find({})
      expect(patients).toHaveLength(1)
    })

    it('should add a check when a new patient is added', async () => {
      const checks = await Check.find({})
      expect(checks).toHaveLength(1)
    })
  })

  describe('GET /api/patients/:dni', () => {
    let token = ''

    beforeEach(async () => {
      await User.deleteMany({})
      await Patient.deleteMany({})
      await Check.deleteMany({})

      await api
        .post('/api/users')
        .send(validUser)
      const response = await api
        .post('/api/login')
        .send(validLoginCredentials)

      token = response.body.jwt

      await api
        .post('/api/patients')
        .set('authorization', 'Bearer ' + token)
        .send(validPatient)
    })

    it('should return a patient using the correct dni', async () => {
      const patientResponse = await api
        .get(`/api/patients/${validPatient.dni}`)
        .set('authorization', 'Bearer ' + token)

      expect(patientResponse).toBeTruthy()
      expect(patientResponse).not.toBe({})
      expect(patientResponse.status).toBe(200)
    })
  })

  afterAll(() => {
    mongoose.connection.close()
    server.close()
  })
})
