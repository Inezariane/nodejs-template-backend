const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userController');
const { protect, isAdmin } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /user/me:
 *   get:
 *     summary: Get current user's profile
 *     description: Returns the profile of the logged-in user.
 *     responses:
 *       200:
 *         description: Successfully retrieved user profile
 *       401:
 *         description: Unauthorized (JWT token missing or invalid)
 */
router.get('/me', userCtrl.getProfile);

/**
 * @swagger
 * /user/me:
 *   put:
 *     summary: Update current user's profile
 *     description: Allows a user to update their profile information.
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
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Invalid input (e.g., missing fields)
 *       401:
 *         description: Unauthorized
 */
router.put('/me', userCtrl.updateProfile);

/**
 * @swagger
 * /user/me:
 *   delete:
 *     summary: Delete the current user's account
 *     description: Allows a user to delete their account.
 *     responses:
 *       200:
 *         description: Account deleted successfully
 *       401:
 *         description: Unauthorized
 */
router.delete('/me', userCtrl.deleteMyAccount);

/**
 * @swagger
 * /user/all:
 *   get:
 *     summary: Get all users
 *     description: "Admin only: Fetches all users (normal users and admins)."
 *     responses:
 *       200:
 *         description: Successfully retrieved all users
 *       403:
 *         description: Forbidden (only admin can access)
 */
router.get('/all', protect, isAdmin, userCtrl.getAllUsers);

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     description: "Admin only: Allows an admin to delete a user by their ID."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to be deleted
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       403:
 *         description: Forbidden (only admin can delete users)
 */
router.delete('/:email', protect, isAdmin, userCtrl.deleteUserByEmail);

/**
 * @swagger
 * /user/search:
 *   get:
 *     summary: Search users by different fields
 *     description: "Admin only: Allows an admin to search users by fields such as name, email, or phone number."
 *     parameters:
 *       - in: query
 *         name: firstName
 *         description: The first name to search for
 *         schema:
 *           type: string
 *       - in: query
 *         name: lastName
 *         description: The last name to search for
 *         schema:
 *           type: string
 *       - in: query
 *         name: email
 *         description: The email to search for
 *         schema:
 *           type: string
 *       - in: query
 *         name: phoneNumber
 *         description: The phone number to search for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved search results
 *       403:
 *         description: Forbidden (only admin can search users)
 */
router.get('/search', protect, isAdmin, userCtrl.searchUsers);

module.exports = router;
