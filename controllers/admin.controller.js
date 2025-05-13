const { Op } = require('sequelize');
const User = require('../models/user.model');

exports.getAllUsers = async (req, res) => {
  const users = await User.findAll();
  res.json(users);
};

exports.updateUser = async (req, res) => {
  const user = await User.findByPk(req.params.userId);
  if (!user) return res.status(404).json({ message: 'User not found' });

  await user.update(req.body);
  res.json({ message: 'User updated', user });
};

exports.searchUsers = async (req, res) => {
  const { query } = req.query;
  const users = await User.findAll({
    where: {
      [Op.or]: [
        { email: { [Op.iLike]: `%${query}%` } },
        { firstName: { [Op.iLike]: `%${query}%` } },
        { phone: { [Op.iLike]: `%${query}%` } }
      ]
    }
  });
  res.json(users);
};

exports.deleteUser = async (req, res) => {
  const user = await User.findByPk(req.params.userId);
  await user.destroy();
  res.json({ message: 'User deleted' });
};

exports.deleteAdminAccount = async (req, res) => {
  const user = await User.findByPk(req.user.userId);
  await user.destroy();
  res.json({ message: 'Admin account deleted' });
};
