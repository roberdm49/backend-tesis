const patientsRouter = require('express').Router()
const multer = require('multer')
const upload = multer()
const Patient = require('../models/Patient')
const Check = require('../models/Check')
const userExtractor = require('../middlewares/userExtractor')
const checkIfThereIsSomeErrorInThePatientBody = require('../utils/checkIfThereIsSomeErrorInThePatientBody')
const getCheckImagesStoredUrls = require('../utils/getCheckImagesStoredUrls')

patientsRouter.post('/', [userExtractor, upload.array('images')], async (request, response, next) => {
  const {
    dni,
    name,
    lastname,
    gender,
    birthDate,
    checkDate,
    diabetesType
  } = request.body

  const result = checkIfThereIsSomeErrorInThePatientBody(request.body)
  if (result.error) {
    return response.status(400).json({ error: result.error })
  }

  const patient = await Patient.findOne({ dni })
  const urls = getCheckImagesStoredUrls(request.files)

  if (patient) {
    const check = new Check({
      checkDate,
      images: urls,
      patient: patient._id
    })
    check.save().catch(err => next(err))
    patient.checks = patient.checks.concat(check._id)
    await patient.save().catch(err => next(err))
    // TODO: the code above can be refactored into a single function

    return response.status(201).end()
  } else {
    const patientDB = new Patient({ dni, name, lastname, gender, birthDate, diabetesType })
    const savedPatient = await patientDB.save().catch(err => next(err))
    const check = new Check({
      checkDate,
      images: urls,
      patient: savedPatient._id
    })

    const savedCheck = await check.save().catch(err => next(err))
    savedPatient.checks = savedPatient.checks.concat(savedCheck._id)
    await savedPatient.save().catch(err => next(err))

    // TODO: the code above can be refactored into a single function
    return response.status(201).end()
  }
})

patientsRouter.get('/:dni', userExtractor, async (request, response) => {
  const { dni } = request.params
  const patient = await Patient.findOne({ dni })

  return patient
    ? response.status(200).json({ patient })
    : response.status(400).json({ error: 'Dni not found' })
})

module.exports = patientsRouter
