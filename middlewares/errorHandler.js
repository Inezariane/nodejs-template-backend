const { ValidationError } = require('sequelize');

const errorHandler = (err, req, res, next) => {
  console.error(' Error:', err);

  // Sequelize validation error
  if (err instanceof ValidationError) {
    return res.status(400).json({
      message: err.errors[0].message,
    });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ message: 'Invalid token. Please login again ' });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ message: 'Token expired. Please login again ' });
  }

  // Any other error
  return res.status(err.status || 500).json({
    message: err.message || 'Something broke ',
  });
};

module.exports = errorHandler;
