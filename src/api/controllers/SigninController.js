class SigninController {

  constructor(userModel, body) {
    const { name, lastname, avatar, username, password, role } = body;
    this.name = name;
    this.lastname = lastname;
    this.avatar = avatar;
    this.username = username;
    this.password = password;
    this.role = role;
    this.userModel = userModel;
  }

  getCurrentUser() {
    const users = this.userModel.getData();
    const user = users.find(user => user.username === this.username);
    return user;
  }

  theUserAlreadyExists() {
    return Boolean(this.getCurrentUser());
  };

  signinNewUser(callback) {
    const users = this.userModel.getData();
    let nextId = users.reduce((acum, actual) => {
      if (parseInt(actual.id) >= acum) return actual.id;
    }, -1) + 1;

    nextId += 1;

    users.push({
      id: nextId,
      name: this.name,
      lastname: this.lastname,
      avatar: this.avatar,
      username: this.username,
      password: this.password,
      role: this.role,
    });
    this.userModel.writeData(users, callback);
  }

}

module.exports = SigninController;
