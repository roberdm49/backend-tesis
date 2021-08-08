const WITHOUT_SPACES = (field) => `El campo "${field}" campo no puede poseer espacios`
const REQUIRE_FIELD = (field) => `El campo "${field}" es requerido`
const MIN_LENGTH = (size) => `Este campo debe poseer al menos ${size} ${size === 1 ? 'caracter' : 'caracteres'}`
const VALID_AGE = 'Introduzca una edad valida'
const VALID_DNI = (field) => `El campo "${field}" campo solo debe poseer numeros`
const VALID_EMAIL = 'Introduce una dirección de correo electrónico valida'
const VALID_PASSWORD = (size) => `La contraseña debe poseer al menos ${size} caracteres y, entre ellos, una letra mayuscula, una minuscula y un numero`
const VALID_REPEAT_PASSWORD = 'Las contraseñas deben coincidir'

module.exports = {
  WITHOUT_SPACES,
  REQUIRE_FIELD,
  MIN_LENGTH,
  VALID_AGE,
  VALID_DNI,
  VALID_EMAIL,
  VALID_PASSWORD,
  VALID_REPEAT_PASSWORD
}
