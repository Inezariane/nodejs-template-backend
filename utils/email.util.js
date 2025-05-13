const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: 'gideon.kozey@ethereal.email',
      pass: 'cpPKDUCvUFQGQ8GZU9'
  }
});

exports.sendWelcomeEmail = async (email, name) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Welcome!',
    html: `<h1>Hello ${name}, welcome to the app!</h1>`
  });
};

exports.sendResetEmail = async (email, token) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Reset Your Password',
    html: `<p>Click to reset your password: <a href="http://localhost:8000/api/auth/reset-password?token=${token}">Reset Password</a></p>`
  });
};
