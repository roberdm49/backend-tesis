const withoutSpaces = require('./withoutSpaces')

const {
  DNI_MIN_LENGTH,
  LASTNAME_MIN_LENGTH,
  MAX_AGE, MIN_AGE,
  NAME_MIN_LENGTH,
  PASSWORD_MIN_LENGTH,
  USERNAME_MIN_LENGTH
} = require('./constants')
const minLength = require('./minLength')

const validAge = (value) => {
  return (value >= MIN_AGE && value <= MAX_AGE)
}

const validDni = (value) => {
  const minLengthForDni = minLength(DNI_MIN_LENGTH)
  const theDniIsTooShort = minLengthForDni(value)
  const splittedValue = value.split('')
  for (const char of splittedValue) {
    if (!(/[0-9]/i.test(char))) {
      return 'Este campo solo debe poseer numeros'
    }
  }
  return Boolean(theDniIsTooShort)
}

const validEmail = (value) => {
  // eslint-disable-next-line
  return (/^[a-zA-Z0-9]+[a-zA-Z0-9\.\_\-]*\@[a-zA-Z]{3,}\.[a-zA-Z]{2,}$/i.test(value));
}

const validLastname = (value) => {
  const minLengthForLastname = minLength(LASTNAME_MIN_LENGTH)
  const theLastNameIsValid = minLengthForLastname(value)
  return theLastNameIsValid
}

const validName = (value) => {
  const minLengthForName = minLength(NAME_MIN_LENGTH)
  const theNameIsValid = minLengthForName(value)
  return theNameIsValid
}

const validPassword = (value) => {
  const regex1 = /[a-z]+/i
  const regex2 = /[A-Z]+/i
  const regex3 = /[0-9]+/i
  return (regex1.test(value) && regex2.test(value) && regex3.test(value) && value.length >= PASSWORD_MIN_LENGTH)
}

const validRepeatPassword = (password) => (repeatPassword) => {
  return password === repeatPassword
}

const validRole = (role) => {
  const roles = ['admin', 'onlyRead', 'ophthalmologist', 'technical']
  return roles.includes(role)
}

const validUsername = (value) => {
  const minLengthForUserName = minLength(USERNAME_MIN_LENGTH)
  const theUserNameIsValid = minLengthForUserName(value)
  if (!theUserNameIsValid) {
    return false
  }
  const thereIsSomeSpace = withoutSpaces(value)
  return thereIsSomeSpace
}

module.exports = {
  validAge,
  validDni,
  validEmail,
  validLastname,
  validName,
  validPassword,
  validRepeatPassword,
  validRole,
  validUsername
}
