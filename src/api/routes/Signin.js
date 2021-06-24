const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel');

router.post('/', (req, res) => {
  const {
    name,
    lastname,
    avatar,
    username,
    password,
    role,
  } = req.body;

  const userModel = new UserModel();
  let users = userModel.getData();
  const user = users.find(user => user.username === username);

  if (!!user) {
    res.json({
      mensaje: "The user already exists."
    });
  } else {
    let nextId = users.reduce((acum, actual) => {
      if (parseInt(actual.id) >= acum) return actual.id;
    }, -1);
    nextId += 1;
    users.push({ id: nextId, name, lastname, avatar, username, password, role });
    userModel.writeData(users, () => {
      res.json({
        mensaje: 'Successful user creation'
      });
    });
  }
});

module.exports = router;
