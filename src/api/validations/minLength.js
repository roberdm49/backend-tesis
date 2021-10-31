const minLength = (minLengthOfField) => (value) => {
  return value?.length >= minLengthOfField
}

module.exports = minLength
