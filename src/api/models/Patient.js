const { Schema, model } = require('mongoose')

const patientSchema = new Schema({
  dni: String,
  lastname: String,
  name: String,
  sex: String,
  birtDate: Date,
  diabetesType: Date,
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

const Patient = model('Patient', patientSchema)

module.exports = Patient
