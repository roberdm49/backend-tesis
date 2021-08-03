const { EMPTY_CHARACTER } = require('./constants')

const requireField = (value) => {
  return value !== EMPTY_CHARACTER
}

module.exports = requireField
