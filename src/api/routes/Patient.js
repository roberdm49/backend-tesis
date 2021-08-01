const express = require('express');
const router = express.Router();
const validateToken = require('../middlewares/validateToken');
const { MemoryPatientModel } = require('../models/PatientModel');

router.post('/', validateToken, (req, res) => {
  const {
    dni,
    images,
  } = req.body;

  const patientModel = new MemoryPatientModel();
  console.log({dni})
  let patient = patientModel.getPatient(dni);

  if (patient) {
    res.json({
      mensaje: "The patient already exists."
    });
  } else {
    const newPatient = { dni, images };
    patientModel.setPatient(newPatient, () => {
      res.json({
        mensaje: 'Successful patient creation'
      })
    })
  }
})

module.exports = router;
