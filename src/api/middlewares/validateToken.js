const { verify } = require('jsonwebtoken');

const validateToken = (req, res, next) => {
  const accessToken = req.headers['access-token'];
  console.log(accessToken);

  if (!accessToken) return res.status(400).json({ error: 'User not authenticated!' });
  
  try {
    const validToken = verify(accessToken, 'jwtsecretplschange');
    if (validToken) {
      req.authenticated = true; // create a new attribute called <autheticated>
      return next();
    }
  } catch(err) {
    return res.status(400).json({ error: err });
  }
}

module.exports = validateToken;
