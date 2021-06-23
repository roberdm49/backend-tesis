const path = require('path');
const fs = require('fs');
const usersFile = '../../mocks/users.json';
const users = require(usersFile);

class UserModel {
  getData() {
    console.log(users)
    console.log(typeof users)
    return users;
  }

  writeData(newUsers, callback) {
    const dataPath = path.join(__dirname,'../../users.json');
    fs.writeFile(dataPath, JSON.stringify(newUsers, null, 2), callback);
  }
};

module.exports = UserModel;
