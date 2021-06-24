const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel');
const validateToken = require('../middlewares/validateToken');
const getFilteredUserInformation = require('../helpers/filteredInformation');

router.post('/:id', validateToken, (req, res) => {
  const id = Number(req.params.id);
  const userModel = new UserModel();
  const users = userModel.getData();
  const user = users.find(user => user.id === id);
  
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
