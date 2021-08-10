const uniqueValidator = require('mongoose-unique-validator')
const { Schema, model } = require('mongoose')

const patientSchema = new Schema({
  dni: {
    type: String,
    unique: true
  },
  lastname: String,
  name: String,
  gender: String,
  birtDate: Date,
  diabetesType: String,
  checks: [{
    type: Schema.Types.ObjectId,
    ref: 'Check'
  }]
})

patientSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

patientSchema.plugin(uniqueValidator)

const Patient = model('Patient', patientSchema)

module.exports = Patient
