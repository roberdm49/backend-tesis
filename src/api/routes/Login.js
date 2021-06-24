const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel');
const LoginController = require('../controllers/LoginController');

router.post('/', (req, res) => {
  const userModel = new UserModel();
  let users = userModel.getData();
  const loginController = new LoginController(req.body, users);
  const isAValidUser = loginController.isAValidUser();

  if (isAValidUser) {
    const responseData = loginController.logUser();

    res.json({
      message: 'Successful user authentication',
      ...responseData,
    });
  };

  res.json({
    message: 'Invalid information.'
  });
});

module.exports = router;
