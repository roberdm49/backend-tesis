const express = require('express');
const router = express.Router();
const validateToken = require('../middlewares/validateToken');
const PatientModel = require('../models/PatientModel');

router.post('/', validateToken, (req, res) => {
  const {
    dni,
    images,
  } = req.body;

  const patientModel = new PatientModel();
  let patients = patientModel.getData();
  const patient = patients.find(elem => elem.dni === dni);

  if (!patient) {
    patients.push({ dni, images });
    patientModel.writeData(patients, () => {
      res.json({
        mensaje: 'Successful patient creation'
      })
    })
  } else {
    res.json({
      mensaje: "The patient already exists."
    });
  }
})

module.exports = router;
