const express = require('express');
const userController = require('../controllers/user');
const batchController = require('../controllers/batch');
const courseController = require('../controllers/course')
const validator = require('../validatorMiddleware/validator');
const {checkAuth, isAdmin, isTrainer} = require('../validatorMiddleware/auth');
const user = require('../controllers/user');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file) {
            cb(null, 'images');
        } else {
            cb('No file found', null);
        }
    },
    filename: (req, file, cb) => {
        if (file) {
            cb(
                null,
                file.originalname.split('.')[0].replace(/\ /g, '') +
                Date.now() +
                path.extname(file.originalname)
            );
        } else {
            cb('No file found', null);
        }
    },
});

const checkImage = (req, file, cb) => {
    if (file) {
        if (
            file.mimetype === 'image/jpeg' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/png'
        ) {
            cb(null, true);
        } else {
            cb(null, false);
        }
    } else {
        cb('No file found', false);
    }
};

const upload = multer({
    storage: fileStorage,
    fileFilter: checkImage,
});


router.post('/create-user', upload.single('imageUrl'), validator.createUser, userController.createUser);
router.delete('/delete-user/:userId', userController.deleteUser);
router.put('/edit-user/:userId', upload.single('imageUrl'), validator.editUser, userController.postEditUser);
router.get('/users', userController.getUsers);
router.get('/users/:userId', userController.getUser);


router.post('/create-course', checkAuth, isAdmin, courseController.createCourse);
router.get('/courses', courseController.getCourses);
router.get('/courses/:courseId', courseController.getCourse);
router.put('/edit-course/:courseId', courseController.editCourse);
router.delete('/delete-course/:courseId', courseController.deleteCourse);


router.post('/create-batch', batchController.createBatch);
router.get('/batches', batchController.getBatches);
router.get('/batches/:batchId', batchController.getBatch);
router.put('/edit-batch/:batchId', batchController.editBatch);
router.delete('/delete-batch/:batchId', batchController.deleteBatch)

module.exports = router;