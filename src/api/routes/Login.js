const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel');
const LoginController = require('../controllers/LoginController');

router.post('/', (req, res) => {
  const loginController = new LoginController(new UserModel(), req.body);
  const isAValidUser = loginController.isAValidUser();

  if (isAValidUser) {
    const responseData = loginController.logUser();

    res.json({
      message: 'Successful user authentication.',
      ...responseData,
    });
  } else {
    res.json({
      message: 'Invalid information.'
    });
  };
});

module.exports = router;
