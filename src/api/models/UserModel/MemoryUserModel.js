const path = require('path');
const fs = require('fs');

const pathToMock = '../../../mocks/users.json';

const usersFile = pathToMock;
const users = require(usersFile);

class MemoryUserModel {
  getData() {
    return users;
  }

  writeData(newUsers, callback) {
    const dataPath = path.join(__dirname, pathToMock);
    fs.writeFile(dataPath, JSON.stringify(newUsers, null, 2), callback);
  }
};

module.exports = MemoryUserModel;
