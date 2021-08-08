const constants = require('../constants/errorsMessages')

const signinFieldsValidations = {
  username: true,
  password: true,
  name: true,
  lastname: true,
  email: true,
  role: true
}

const checkIfThereIsSomeErrorInTheBody = requestBody => {
  for (const field in signinFieldsValidations) {
    if (!requestBody[field] || requestBody[field] === '') {
      return { field, error: constants.REQUIRE_FIELD(field) }
    }
  }
  return { field: null, error: false }
}

module.exports = checkIfThereIsSomeErrorInTheBody
