const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const transporter = require('../config/mailer');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const generateToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.register = async (req, res) => {
  try {
    const user = await User.create(req.body);

    // Send welcome email
    let info = await transporter.sendMail({
      from: '"Welcome " <noreply@example.com>',
      to: user.email,
      subject: 'Welcome to our platform!',
      text: `Hi ${user.firstName}, welcome aboard!`,
    });

    console.log("Preview URL: " + nodemailer.getTestMessageUrl(info));

    const token = generateToken(user);
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found " });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials " });

    const token = generateToken(user);
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found " });

    user.password = newPassword;
    await user.save();

    await transporter.sendMail({
      from: '"Password Reset " <noreply@example.com>',
      to: user.email,
      subject: 'Your password has been reset',
      text: `Hi ${user.firstName}, your password was successfully reset.`,
    });

    res.status(200).json({ message: "Password updated & email sent " });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.logout = async (req, res) => {
  res.status(200).json({ message: "Logged out successfully " });
};
