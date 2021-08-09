const patientsRouter = require('express').Router()
const validateToken = require('../middlewares/validateToken')

patientsRouter.post('/', validateToken, (request, response) => {
  response.json('Response from POST patients!')
})

patientsRouter.get('/:dni', validateToken, (request, response) => {
  response.json('Response from GET patients/:dni!')
})

patientsRouter.put('/:dni', validateToken, (request, response) => {
  response.json('Response from PUT patients/:dni!')
})

module.exports = patientsRouter
