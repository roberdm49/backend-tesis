const express = require('express');
const router = express.Router();
const getFilteredUserInformation = require('../helpers/filteredInformation');
const usersFile = '../../mocks/users.json';
const users = require(usersFile);


const { createTokens } = require('../../config/tokenGenerator');

router.post('/', (req, res) => {
  const { username, password } = {...req.body};
  const user = users.find(user => user.username === username);
  if (!!user) {
    if (user.password === password) {
      const accessToken = createTokens(user);
      const expireTime = 1440;
      const filteredUserInformation = getFilteredUserInformation(user);

      res.json({
        user: filteredUserInformation,
        mensaje: 'Successful user authentication',
        token: accessToken,
        expireTime: expireTime,
      });
    } else {
      return res.json({
        mensaje: "The password is incorrect",
      });
    }
  } else {
    return res.json({
      mensaje: "The user does not exists",
    });
  }
})

module.exports = router;
