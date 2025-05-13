const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register', auth.register);
router.post('/login', auth.login);
router.get('/me', authMiddleware, auth.me);
router.post('/request-password-reset', auth.requestPasswordReset);
router.post('/reset-password', auth.resetPassword);

module.exports = router;
