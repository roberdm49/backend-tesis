const Patient = require('../models/Patient')
const Check = require('../models/Check')
const getCheckImagesStoredUrls = require('../utils/getCheckImagesStoredUrls')
const checkIfThereIsSomeErrorInThePatientBody = require('../utils/checkIfThereIsSomeErrorInThePatientBody')
const { BadRequestError } = require('../utils/CustomErrors')

class PatientsController {
  validateRequestFields (data) {
    const result = checkIfThereIsSomeErrorInThePatientBody(data)
    if (result.error) {
      throw new BadRequestError(result.error)
    }
  }

  async post (data, files) {
    const { dni, name, lastname, gender, birthDate, checkDate, diabetesType } = data
    const patient = await Patient.findOne({ dni })
    const urls = getCheckImagesStoredUrls(files)

    if (patient) {
      const check = new Check({
        checkDate,
        images: urls,
        patient: patient._id
      })
      check.save()
      patient.checks = patient.checks.concat(check._id)
      await patient.save()
    } else {
      const patientDB = new Patient({ dni, name, lastname, gender, birthDate, diabetesType })
      const savedPatient = await patientDB.save()
      const check = new Check({
        checkDate,
        images: urls,
        patient: savedPatient._id
      })

      const savedCheck = await check.save()
      savedPatient.checks = savedPatient.checks.concat(savedCheck._id)
      await savedPatient.save()
    }
  }

  async get (dni) {
    const patient = await Patient.findOne({ dni })

    if (!patient) {
      throw new BadRequestError('Dni not found')
    }

    return { patient }
  }
}

module.exports = PatientsController
