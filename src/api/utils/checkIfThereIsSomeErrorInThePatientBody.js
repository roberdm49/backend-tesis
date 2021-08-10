const constants = require('../constants/errorsMessages')

const signinFieldsValidations = {
  dni: true,
  name: true,
  lastname: true,
  gender: true,
  birthDate: true,
  checkDate: true,
  diabetesType: true
}

const checkIfThereIsSomeErrorInTheSigninBody = requestBody => {
  for (const field in signinFieldsValidations) {
    if (!requestBody[field] || requestBody[field] === '') {
      return { field, error: constants.REQUIRE_FIELD(field) }
    }
  }
  return { field: null, error: false }
}

module.exports = checkIfThereIsSomeErrorInTheSigninBody
