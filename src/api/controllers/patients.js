const patientsRouter = require('express').Router()
const Patient = require('../models/Patient')
const Check = require('../models/Check')
const validateToken = require('../middlewares/validateToken')
const checkIfThereIsSomeErrorInThePatientBody = require('../utils/checkIfThereIsSomeErrorInThePatientBody')

patientsRouter.post('/', validateToken, async (request, response, next) => {
  const {
    dni,
    name,
    lastname,
    gender,
    birthDate,
    checkDate,
    diabetesType,
    images
  } = request.body

  const result = checkIfThereIsSomeErrorInThePatientBody(request.body)
  if (result.error) {
    return response.status(400).json({ error: result.error })
  }

  const patient = await Patient.findOne({ dni })

  if (patient) {
    const check = new Check({
      checkDate,
      images,
      patient: patient._id
    })
    check.save().catch(err => next(err))
    patient.checks = patient.checks.concat(check._id)
    await patient.save().catch(err => next(err))
    return response.status(201).end()
  } else {
    // TODO: CHEQUEAR
    const patientDB = new Patient({ dni, name, lastname, gender, birthDate, checkDate, diabetesType })
    const savedPatient = await patientDB.save().catch(err => next(err))
    // const savedPatient = await Patient.findOne({ dni }) // refactor this because is some redundant
    const check = new Check({
      checkDate,
      images,
      patient: savedPatient._id
    })
    const savedCheck = await check.save().catch(err => next(err))
    savedPatient.checks = savedPatient.checks.concat(savedCheck._id)
    await savedPatient.save().catch(err => next(err))
    return response.status(201).end()
  }
})

patientsRouter.get('/:dni', validateToken, (request, response) => {
  response.json('Response from GET patients/:dni!')
})

patientsRouter.put('/:dni', validateToken, (request, response) => {
  response.json('Response from PUT patients/:dni!')
})

module.exports = patientsRouter
