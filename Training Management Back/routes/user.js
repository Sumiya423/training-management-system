const express = require('express');
const userController = require('../controllers/user');
const validator = require('../validatorMiddleware/validator')
const isAdmin = require('../validatorMiddleware/auth');
const user = require('../controllers/user');
const router = express.Router();

router.post('/create-user', validator.createUser, userController.createUser);

router.delete('/delete-user/:userId', userController.deleteUser);

module.exports = router;