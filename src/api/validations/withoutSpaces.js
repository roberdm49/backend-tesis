const { SPACE } = require('../constants/constants')

const withoutSpaces = (value) => {
  return (!value.split('').includes(SPACE))
}

module.exports = withoutSpaces
