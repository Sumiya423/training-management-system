const express = require('express');
const userController = require('../controllers/user');
const validator = require('../validatorMiddleware/validator')
const isAdmin = require('../validatorMiddleware/auth');
const user = require('../controllers/user');
const router = express.Router();

router.post('/create-user', validator.createUser, userController.createUser);

router.delete('/delete-user/:userId', userController.deleteUser);

router.put('/edit-user/:userId',validator.editUser, userController.postEditUser);

router.get('/users', userController.getUsers);

router.get('/users/:userId', userController.getUser);

router.post('/create-course', userController.createCourse);
router.post('/create-batch', userController.createBatch);
router.get('/batches', userController.getBatches);
router.get('/batches/:batchId', userController.getBatch);

module.exports = router;