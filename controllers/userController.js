const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');

// GET user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.user.email } });
    if (!user) return res.status(404).json({ message: 'User not found ' });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// UPDATE user profile
exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.user.email } });  // Search by email instead of id
    if (!user) return res.status(404).json({ message: 'User not found ' });

    const updates = req.body;
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 12);
    }

    await user.update(updates);
    res.status(200).json({ message: 'Profile updated ', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// DELETE own account
exports.deleteMyAccount = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.user.email } });  // Search by email instead of id
    if (!user) return res.status(404).json({ message: 'User not found ' });

    await user.destroy();
    res.status(200).json({ message: 'Your account has been deleted ' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ADMIN: view all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ADMIN: delete any user
exports.deleteUserByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.params.email } });
    if (!user) return res.status(404).json({ message: 'User not found ' });

    await user.destroy();
    res.status(200).json({ message: 'User deleted successfully ' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ADMIN: search users
exports.searchUsers = async (req, res) => {
  const { q } = req.query;
  try {
    const users = await User.findAll({
      where: {
        [Op.or]: [
          { firstName: { [Op.iLike]: `%${q}%` } },
          { lastName: { [Op.iLike]: `%${q}%` } },
          { email: { [Op.iLike]: `%${q}%` } },
          { phone: { [Op.iLike]: `%${q}%` } },
          { nationalId: { [Op.iLike]: `%${q}%` } },
        ],
      },
    });

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
