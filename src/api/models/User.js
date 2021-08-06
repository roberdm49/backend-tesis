const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  name: String,
  lastname: String,
  username: String,
  password: String,
  avatar: String,
  email: String,
  role: String
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const User = model('User', userSchema)

module.exports = User
