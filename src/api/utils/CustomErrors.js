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

class AmazonError {
  constructor (message) {
    this.message = message
    this.name = 'AmazonError'
  }
}

module.exports = { BadRequestError, ValidationError, AmazonError }
