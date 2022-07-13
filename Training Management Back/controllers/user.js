const User = require('../models/user');
const Course = require('../models/course');
const Batch = require('../models/batch')
const HTTP_STATUS = require('../utils/httpStatus');
const { success, failure } = require('../utils/commonResponse');
const { validationResult } = require('express-validator');

let defaultPass = 123456;

class userController {

    async createUser(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).send(failure('Invalid Inputs', errors.array()));
            }

            const name = req.body.name;
            const email = req.body.email;
            const password = req.body.password? req.body.password: defaultPass;
            const isAdmin = req.body.isAdmin;
            const isTrainer = req.body.isTrainer;
            const user = new User({ name, email, password, isAdmin, isTrainer });
            await user.save();

            const userData = {
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                isTrainer: user.isTrainer,
                isVerified: user.isVerified
            };

            return res.status(HTTP_STATUS.OK).send(success('User is created successfully!', userData));
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }

    async getUsers(req,res,next){
        try {
            const users = await User.find()
            return res
            .status(HTTP_STATUS.OK)
            .send(
                success('All users are fetched successfully', users)
            );

        } catch (error) {
            next(error);
        }
    }

    async getUser(req, res, next) {
        try {
            const userId = req.params.userId;
            const user= await User.findById(userId);
            if (user) {
                return res.status(HTTP_STATUS.OK).send(success('User Found', user));
            }

            return res.status(HTTP_STATUS.OK).send(success('User not Found'));
        } catch (error) {
            console.log(error);
            next(error);
        }

    }

    async postEditUser(req, res, next) {
        try {
            const errors = validationResult(req);
            const userId = req.params.userId;
            const updatedUser = await User.findById(userId);
    
            if (!errors.isEmpty()) {
                return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).send(failure('Invalid Inputs', errors.array()));
            }

            if (updatedUser) {
                updatedUser.name = req.body.name? req.body.name : updatedUser.name;
                updatedUser.email = req.body.email? req.body.email : updatedUser.email;
                updatedUser.isAdmin = req.body.isAdmin? req.body.isAdmin : updatedUser.isAdmin;
                updatedUser.isTrainer = req.body.isTrainer? req.body.isTrainer : updatedUser.isTrainer;

                await updatedUser.save();
                return res.status(HTTP_STATUS.OK).send(success('User is updated successfully!', updatedUser));
            }
            return res.status(HTTP_STATUS.NOT_FOUND).send(failure('User is not found to update' ))


        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async deleteUser(req, res, next) {
        try {
            const userId = req.params.userId;
            await User.findByIdAndDelete(userId).exec();
            return res
                .status(HTTP_STATUS.OK)
                .send(success('User is deleted successfully'));
        } catch (error) {
            next(error);
        }
    }

    async createCourse(req, res, next){
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).send(failure('Invalid Inputs', errors.array()));
            }

            const title = req.body.title;
            const description = req.body.description;
            const topics = req.body.topics;
            
            const course = new Course({ title, description, topics});
            await course.save();

            return res.status(HTTP_STATUS.OK).send(success('Course is created successfully!', course));
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async createBatch(req, res, next){
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).send(failure('Invalid Inputs', errors.array()));
            }

            const title = req.body.title;
            const description = req.body.description;
            const startDate = req.body.startDate;
            const endDate = req.body.endDate;
            const trainees = req.body.trainees;
            const courses = req.body.courses;
            
            const batch = new Batch({ title, description, startDate, endDate, trainees, courses});
            await batch.save();

            return res.status(HTTP_STATUS.OK).send(success('Batch is created successfully!', batch));
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async getBatches(req, res, next) {
        try {
            const batches = await Batch.find()
            return res
            .status(HTTP_STATUS.OK)
            .send(
                success('All users are fetched successfully', batc)
            );

        } catch (error) {
            next(error);
        }
    }

    async getBatch(req, res, next) {
        try {
            const batchId = req.params.batchId;
            const batch = await Batch.findOne({batchId}).populate('trainees', 'name email _id').populate('courses').exec();
            return res
            .status(HTTP_STATUS.OK)
            .send(
                success('All users are fetched successfully', batch)
            );

        } catch (error) {
            next(error);
        }
    }
}

module.exports = new userController();