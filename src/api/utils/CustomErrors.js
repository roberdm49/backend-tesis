class BadRequestError {
  constructor (message) {
    this.message = message
    this.name = 'BadRequestError'
  }
}

class ValidationError {
  constructor (message) {
    this.message = message
    this.name = 'ValidationError'
  }
}

module.exports = { BadRequestError, ValidationError }
