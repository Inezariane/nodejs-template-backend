const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/authController');

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registers a new user
 *     description: Allows a user to register with their details
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */
router.post('/register', authCtrl.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     description: Allows a user to log in and get a JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful, returns JWT
 *       401:
 *         description: Unauthorized
 */
router.post('/login', authCtrl.login);
/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Reset user password
 *     description: Allows a user to reset their password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       404:
 *         description: User not found
 */
router.post('/reset-password', authCtrl.resetPassword);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: User logout
 *     description: Allows a user to log out
 *     responses:
 *       200:
 *         description: Logout successful
 */
router.post('/logout', authCtrl.logout);

module.exports = router;
