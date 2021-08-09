const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  name: String,
  lastname: String,
  username: String,
  passwordHash: String,
  avatar: String,
  email: String,
  role: String
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v

    delete returnedObject.passwordHash
  }
})

const User = model('User', userSchema)

module.exports = User
