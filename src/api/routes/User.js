const express = require('express');
const router = express.Router();
const usersFile = '../../mocks/users.json';
const users = require(usersFile);
const validateToken = require('../middlewares/validateToken');
const getFilteredUserInformation = require('../helpers/filteredInformation');

router.post('/:id', validateToken, (req, res) => {
  const id = Number(req.params.id)
  const user = users.find(user => user.id === id)
  if (user) {
    const filteredUserInformation = getFilteredUserInformation(user)
    res.json({
      user: filteredUserInformation,
    })
  } else {
    res.status(404)
  }
})

module.exports = router;
