const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const usersFile = '../../mocks/users.json';
const users = require(usersFile);

router.post('/', (req, res) => {
  const {
    name,
    lastname,
    avatar,
    username,
    password,
    role,
  } = req.body;
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
    const usersPath = path.join(__dirname,'../../users.json');
    fs.writeFile(usersPath, JSON.stringify(users, null, 2), () => {
      res.json({
        mensaje: 'Successful user creation'
      })
    });
  }
});

module.exports = router;
