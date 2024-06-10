const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, 'iloma@portal', (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Forbidden' });
    req.userId = decoded.userId;
    next();
  });
}

module.exports = {
  authenticateToken
}