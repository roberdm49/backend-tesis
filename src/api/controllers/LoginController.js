const { createTokens } = require('../../config/createToken');
const getFilteredUserInformation = require('../helpers/filteredInformation');

class LoginController {

  constructor(userModel, body) {
    const { username, password } = body;
    this.username = username;
    this.password = password;
    this.userModel = userModel;
  };

  getCurrentUser() {
    const users = this.userModel.getData();
    const user = users.find(user => user.username === this.username);
    return user;
  };
  
  logUser() {
    const user = this.getCurrentUser();
    const accessToken = createTokens(user);
    const filteredUserInformation = getFilteredUserInformation(user);

    const responseData = {
      user: filteredUserInformation,
      token: accessToken,
    };

    return responseData;
  }

  isAValidUser() {
    const user = this.getCurrentUser();
    return (!!user && user.password === this.password);
  };
};

module.exports = LoginController;
