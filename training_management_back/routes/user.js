const express = require('express');
const userController = require('../controllers/user');
const batchController = require('../controllers/batch');
const courseController = require('../controllers/course');
const quizController = require('../controllers/quiz')
const validator = require('../validatorMiddleware/validator');
const { checkAuth, isAdmin, isTrainer } = require('../validatorMiddleware/auth');
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


router.post('/create-user', checkAuth, isAdmin, upload.single('imageUrl'), validator.createUser, userController.createUser);
router.delete('/delete-user/:userId', checkAuth, isAdmin, userController.deleteUser);
router.put('/edit-user/:userId', checkAuth, upload.single('imageUrl'), validator.editUser, userController.postEditUser);
router.get('/users', checkAuth, userController.getUsers);
router.get('/users/:userId', checkAuth, userController.getUser);

router.post('/create-course', checkAuth, isAdmin, courseController.createCourse);
router.get('/courses', checkAuth, courseController.getCourses);
router.get('/courses/:courseId', checkAuth, courseController.getCourse);
router.put('/edit-course/:courseId', checkAuth, courseController.editCourse);
router.delete('/delete-course/:courseId', checkAuth, isAdmin, courseController.deleteCourse);

router.post('/create-batch', checkAuth, isAdmin, batchController.createBatch);
router.get('/batches', checkAuth, batchController.getBatches);
router.get('/batches/:batchId', checkAuth, batchController.getBatch);
router.put('/edit-batch/:batchId', checkAuth, isAdmin, batchController.editBatch);
router.delete('/delete-batch/:batchId', checkAuth, isAdmin, batchController.deleteBatch);

router.post('/create-quiz', checkAuth, isTrainer, quizController.createQuiz);
router.get('/quizes', checkAuth, quizController.getQuizes);
router.get('/quizes/:quizId', checkAuth, quizController.getQuiz);
router.delete('/delete-quiz/:quizId', checkAuth, isTrainer, quizController.deleteQuiz);

module.exports = router;