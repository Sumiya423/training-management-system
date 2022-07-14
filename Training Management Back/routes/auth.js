const express = require('express');
const authController = require('../controllers/auth');
const validator = require('../validatorMiddleware/validator');
const router = express.Router();

router.post('/signin', authController.signin);

module.exports = router;