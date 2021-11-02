const loginRouter = require('express').Router()
const LoginController = require('../controllers/Login')

loginRouter.post('/', async (request, response, next) => {
  const { username, password } = request.body
  const loginController = new LoginController()

  try {
    const result = await loginController.post(username, password)
    return response.status(202).json(result)
  } catch (error) {
    next(error)
  }
})

module.exports = loginRouter
