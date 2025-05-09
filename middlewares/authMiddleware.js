const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();

exports.protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer '))
    return res.status(401).json({ message: 'Not authorized' });

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({
      where: { email: decoded.email },
      attributes: { exclude: ['password'] }
    });

    if (!user) return res.status(404).json({ message: 'User not found' });

    req.user = user;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token invalid' });
  }
};


exports.isAdmin = (req, res, next) => {
  if (req.user.role !== 'Admin')
    return res.status(403).json({ message: 'Admins only' });
  next();
};

