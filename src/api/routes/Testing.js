const testingRouter = require('express').Router()
const TestingController = require('../controllers/Testing')

testingRouter.post('/reset', async (request, response) => {
  const testingController = new TestingController()

  try {
    await testingController.post()
    return response.status(204).end()
  } catch (error) {
    console.log(error)
  }
})

module.exports = testingRouter
