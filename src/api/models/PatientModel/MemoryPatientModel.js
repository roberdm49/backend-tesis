const path = require('path');
const fs = require('fs');

const pathToMock = '../../../mocks/patientsImages.json'

const patientsImagesFile = pathToMock;
const patientsImages = require(patientsImagesFile);

class MemoryPatientModel {

  getPatients() {
    return patientsImages;
  }

  getPatient(dni) {
    console.log(patientsImages)
    console.log({patientsImages})
    const patient = patientsImages.find(patient => patient.dni === dni);
    return patient;
  }

  setPatient(newPatient, callback) {
    const dataPath = path.join(__dirname, pathToMock);
    const newPatientImages = [...patientsImages, newPatient];
    fs.writeFile(dataPath, JSON.stringify(newPatientImages, null, 2), callback);
    return newPatientImages;
  }
};

module.exports = MemoryPatientModel;
