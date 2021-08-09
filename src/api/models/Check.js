const { Schema, model } = require('mongoose')

const checkSchema = new Schema({
  checkDate: Date,
  images: [String],
  patient: {
    type: Schema.Types.ObjectId,
    ref: 'Patient'
  }
})

checkSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Check = model('Check', checkSchema)

module.exports = Check
