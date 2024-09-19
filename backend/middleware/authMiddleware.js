// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  const token = authHeader.split(' ')[1];  // Extract token from "Bearer <token>"
  console.log('Extracted Token:', token);
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verify token

    // Debugging: Log the decoded token
    console.log('Decoded Token:', decoded);

    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error('Token verification failed:', error.message);  // Log the verification error
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
