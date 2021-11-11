const uniqueValidator = require('mongoose-unique-validator')
const { Schema, model } = require('mongoose')

const quequeUserPendent = new Schema({
  name: String,
  lastname: String,
  username: {
    type: String,
    unique: true
  },
  passwordHash: String,
  avatar: String,
  email: String,
  role: String
})

quequeUserPendent.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v

    delete returnedObject.passwordHash
  }
})

quequeUserPendent.plugin(uniqueValidator)

const QueueUserPendent = model('QueueUserPendent', quequeUserPendent)

module.exports = QueueUserPendent
