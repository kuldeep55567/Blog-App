const jwt = require('jsonwebtoken');
const User = require('../Model/UserModel'); 
require('dotenv').config();

const authMiddleWare = (requiredRole) => {
  return async (req, res, next) => {
    try {
      const token = req.header('Authorization');
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized. No token provided.' });
      }
      
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      const user = await User.findByPk(decoded.id);

      if (!user || (requiredRole && user.role !== requiredRole)) {
        return res.status(403).json({ message: 'Unauthorized' });
      }

      if (user.isBlocked) {
        return res.status(403).json({ message: 'Access denied. User is blocked.' });
      }

      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
  };
};

module.exports = {
  authMiddleWare,
};
