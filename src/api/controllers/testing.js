const User = require('../models/User')
const Patient = require('../models/Patient')
const Check = require('../models/Check')

class TestingController {
  async post () {
    await User.deleteMany({})
    await Patient.deleteMany({})
    await Check.deleteMany({})
  }
}

module.exports = TestingController
