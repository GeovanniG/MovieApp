const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  // Verify token
  try {
    const token =  (req.headers.authorization && req.headers.authorization.split(' ')[1])
    const { id } = await jwt.verify(token, process.env.JWTSECRET);
    req.body.id = id;
  } catch (e) {
    if (e.name === 'TokenExpiredError') return res.status(403).json({ error: 'Session expired. Please sign in', name: e.name })
    return res.status(401).json({ error: 'User not authorized' })
  }
  
  next();
}

module.exports = auth;