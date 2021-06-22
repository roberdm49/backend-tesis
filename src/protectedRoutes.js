const express = require('express');
const protectedRoutes = express.Router(); 

protectedRoutes.use((req, res, next) => {
  const token = req.headers['access-token'];
  if (token) {
    jwt.verify(token, app.get('key'), (err, decoded) => {      
      if (err) {
        return res.json({ mensaje: 'Invalid token' });    
      } else {
        req.decoded = decoded;    
        next();
      }
    });
  } else {
    res.send({ 
      mensaje: 'Token not provided.' 
    });
  }
});

module.exports = protectedRoutes;
