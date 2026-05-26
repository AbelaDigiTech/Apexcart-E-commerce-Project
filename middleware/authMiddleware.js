const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'my_ultra_secure_secret_key_12345');
      
      // Fetch user without returning their password, assign it to req.user
      req.user = await User.findById(decoded.id).select('-password');
      return next(); // Pass control to the next middleware or controller
    }

    return res.status(401).json({ message: 'Not authorized, token missing' });
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized, token invalid' });
  }
};

module.exports = protect;