const minLength = (minLengthOfField) => (value) => {
  if (value.length >= minLengthOfField) {
    return undefined
  } else {
    return `Este campo debe poseer al menos ${minLengthOfField} ${minLengthOfField === ONE ? 'caracter' : 'caracteres'}`
  }
}

module.exports = minLength;
