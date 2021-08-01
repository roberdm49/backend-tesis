const express = require('express');
const router = express.Router();
const { MemoryUserModel } = require('../models/UserModel');
const LoginController = require('../controllers/LoginController');

router.post('/', (req, res) => {
  const loginController = new LoginController(new MemoryUserModel(), req.body);

  if (loginController.isAValidUser()) {
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
