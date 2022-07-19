const express = require('express');
const authController = require('../controllers/auth');
const userController = require('../controllers/user')
const validator = require('../validatorMiddleware/validator');
const router = express.Router();

router.post('/signin', authController.signin);

router.post(
    '/change-password/:token/:userId',
    userController.setPassword
);
router.post(
    '/reset-password/:token/:userId',
    userController.setPassword
);
router.post(
    '/send-reset-password-mail',
    authController.sendResetPasswordMail
);

module.exports = router;