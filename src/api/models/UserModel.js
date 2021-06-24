const path = require('path');
const fs = require('fs');
const usersFile = '../../mocks/users.json';
const users = require(usersFile);

class UserModel {
  getData() {
    return users;
  }

  writeData(newUsers, callback) {
    const dataPath = path.join(__dirname,'../../mocks/users.json');
    fs.writeFile(dataPath, JSON.stringify(newUsers, null, 2), callback);
  }
};

module.exports = UserModel;
