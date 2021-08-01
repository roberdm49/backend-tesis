const { verify } = require('jsonwebtoken');

const validateToken = (req, res, next) => {
  const authorization = req.get('authorization')

  if (!authorization) return res.status(401).json({ error: 'User not authenticated!' });
  
  try {
    const validToken = verify(authorization, 'jwtsecretplschange');
    if (validToken) {
      return next();
    }
  } catch(err) {
    return res.status(400).json({ error: err });
  }
}

module.exports = validateToken;
