const usersRouter = require('express').Router()
const multer = require('multer')
const upload = multer()
const UsersController = require('../controllers/Users')

usersRouter.get('/', async (request, response, next) => {
  const usersController = new UsersController()

  try {
    const result = await usersController.get()
    return response.status(200).json(result)
  } catch (error) {
    next(error)
  }
})

usersRouter.post('/', upload.single('avatar'), async (request, response, next) => {
  const usersController = new UsersController()

  try {
    await usersController.post(request.body, request.file)
    return response.status(201).end()
  } catch (error) {
    next(error)
  }
})

module.exports = usersRouter
