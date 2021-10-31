const constants = require('./errorsMessages')

const patientFieldsValidations = {
  dni: true,
  name: true,
  lastname: true,
  gender: true,
  birthDate: true,
  checkDate: true,
  diabetesType: true
}

const checkIfThereIsSomeErrorInThePatientBody = requestBody => {
  for (const field in patientFieldsValidations) {
    if (!requestBody[field] || requestBody[field] === '') {
      return { field, error: constants.REQUIRE_FIELD(field) }
    }
  }
  return { field: null, error: false }
}

module.exports = checkIfThereIsSomeErrorInThePatientBody
