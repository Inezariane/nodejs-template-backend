const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const User = sequelize.define('User', {
  userId: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      is: /^07[2,3,8,9]\d{7}$/i
    }
  },
  gender: { type: DataTypes.ENUM('male', 'female'), allowNull: false },
  nationalId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { len: [16, 16] }
  },
  role: { type: DataTypes.ENUM('user', 'admin'), defaultValue: 'user' },
  password: { type: DataTypes.STRING, allowNull: false },
});

module.exports = User;
