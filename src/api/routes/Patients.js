const patientsRouter = require('express').Router()
const multer = require('multer')
const upload = multer()
const userExtractor = require('../middlewares/userExtractor')
const PatientsController = require('../controllers/Patients')

patientsRouter.post('/', [userExtractor, upload.array('images')], async (request, response, next) => {
  const patientsController = new PatientsController()

  try {
    patientsController.validateRequestFields(request.body)
    await patientsController.post(request.body, request.files)
    return response.status(201).end()
  } catch (error) {
    next(error)
  }
})

patientsRouter.get('/:dni', userExtractor, async (request, response, next) => {
  const { dni } = request.params
  const patientsController = new PatientsController()

  try {
    const result = await patientsController.get(dni)
    return response.status(200).json(result)
  } catch (error) {
    next(error)
  }
})

module.exports = patientsRouter
