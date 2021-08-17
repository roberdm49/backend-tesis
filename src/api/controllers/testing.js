const testingRouter = require('express').Router()
const User = require('../models/User')
const Patient = require('../models/Patient')
const Check = require('../models/Check')

testingRouter.post('/reset', async (request, response) => {
  await User.deleteMany({})
  await Patient.deleteMany({})
  await Check.deleteMany({})

  return response.status(204).end()
})

module.exports = testingRouter
