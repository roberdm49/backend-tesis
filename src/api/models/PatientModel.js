const path = require('path');
const fs = require('fs');
const patientsImagesFile = '../../mocks/patientsImages.json';
const patientsImages = require(patientsImagesFile);

class PatientModel {
  getData() {
    console.log(patientsImages)
    console.log(typeof patientsImages)
    return patientsImages;
  }

  writeData(newPatientsImages, callback) {
    const dataPath = path.join(__dirname,'../../patientImages.json');
    fs.writeFile(dataPath, JSON.stringify(newPatientsImages, null, 2), callback);
  }
};

module.exports = PatientModel;
