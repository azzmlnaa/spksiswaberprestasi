const { verify } = require('../utils');

const authMiddleware = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: 'No token' });
  const parts = auth.split(' ');
  if (parts.length !== 2) return res.status(401).json({ message: 'Invalid token' });
  const token = parts[1];
  try {
    const user = verify(token);
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

const requireRole = (roles) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: 'No user' });
  if (!roles.includes(req.user.role)) return res.status(403).json({ message: 'Forbidden' });
  next();
};

module.exports = { authMiddleware, requireRole };
