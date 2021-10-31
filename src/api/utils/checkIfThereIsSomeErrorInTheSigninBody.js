const {
  usernameRules,
  passwordRules,
  nameRules,
  lastnameRules,
  emailRules,
  roleRules,
  avatarRules,
  repeatPasswordRules
} = require('./fieldsRules')
const { thereIsAnErrorInTheRules } = require('./validateRules')

const signinFieldsValidations = {
  username: usernameRules,
  password: passwordRules,
  name: nameRules,
  lastname: lastnameRules,
  email: emailRules,
  role: roleRules,
  avatar: avatarRules,
  repeatPassword: repeatPasswordRules
}

const checkIfThereIsSomeErrorInTheSigninBody = requestBody => {
  for (const field in signinFieldsValidations) {
    const error = field === 'repeatPassword'
      ? thereIsAnErrorInTheRules(requestBody[field], signinFieldsValidations[field], requestBody.password)
      : thereIsAnErrorInTheRules(requestBody[field], signinFieldsValidations[field])

    if (error) return { field, error }
  }
  return { field: null, error: false }
}

module.exports = checkIfThereIsSomeErrorInTheSigninBody
