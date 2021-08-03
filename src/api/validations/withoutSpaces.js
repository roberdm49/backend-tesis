const { SPACE } = require('./constants')

const withoutSpaces = (value) => {
  return (!value.split('').includes(SPACE))
}

module.exports = withoutSpaces
