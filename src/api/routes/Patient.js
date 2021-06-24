const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const patientsImagesFile = '../../mocks/patientsImages.json';
const patientsImages = require(patientsImagesFile);
const validateToken = require('../middlewares/validateToken');

router.post('/', validateToken, (req, res) => {
  const {
    dni,
    images,
  } = req.body;
  const patient = patientsImages.find(elem => elem.dni === dni);
  if (!patient) {
    patientsImages.push({ dni, images });
    const patientsPath = path.join(__dirname,'../../patientsImages.json');
    fs.writeFile(patientsPath, JSON.stringify(patientsImages, null, 2), () => {
      res.json({
        mensaje: 'Successful patient creation'
      })
    });
  } else {
    res.json({
      mensaje: "The patient already exists."
    });
  }
})

module.exports = router;
