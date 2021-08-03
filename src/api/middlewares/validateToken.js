const { verify } = require('jsonwebtoken')

const validateToken = (req, res, next) => {
  const authorization = req.get('authorization')

  let token = null

  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7)
  }

  const validToken = verify(token, 'jwtsecretplschange')

  if (!(token && validToken)) {
    return res.status(401).json({ error: 'Token missing or invalid.' })
  } else {
    return next()
  }
}

module.exports = validateToken
