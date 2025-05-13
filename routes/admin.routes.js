const express = require('express');
const router = express.Router();
const admin = require('../controllers/admin.controller');
const user = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');

router.use(authMiddleware);
router.use(roleMiddleware('admin'));

router.get('/users', admin.getAllUsers);
router.get('/users/search', admin.searchUsers);
router.put('/users/:userId', admin.updateUser);
router.delete('/users/:userId', admin.deleteUser);
router.delete('/delete-me', admin.deleteAdminAccount);

router.put('/update-me', user.updateAccount);
router.delete('/me-user', user.deleteAccount);

module.exports = router;
