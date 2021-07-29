const WITHOUT_SPACES = 'Este campo no puede poseer espacios';
const REQUIRE_FIELD = 'Este campo es requerido';
const MIN_LENGTH = (size) => `Este campo debe poseer al menos ${size} ${size === ONE ? 'caracter' : 'caracteres'}`;
const VALID_AGE = 'Introduzca una edad valida';
const VALID_DNI = 'Este campo solo debe poseer numeros';
const VALID_EMAIL = 'Introduce una dirección de correo electrónico valida';
const VALID_PASSWORD = (size) => `La contraseña debe poseer al menos ${size} caracteres y, entre ellos, una letra mayuscula, una minuscula y un numero`;
const VALID_REPEAT_PASSWORD = 'Las contraseñas deben coincidir';