const express = require('express');
const router = express.Router();
const { MemoryUserModel } = require('../models/UserModel');
const SigninController = require('../controllers/SigninController');

router.post('/', (req, res) => {
  const signinController = new SigninController(new MemoryUserModel(), req.body);

  if (signinController.theUserAlreadyExists()) {
    res.json({ message: 'The user already exists.' })
  };

  signinController.signinNewUser(() => {
    res.json({ message: 'Successful user creation.' })
  });
});

module.exports = router;
