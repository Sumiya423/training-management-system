const User = require('../models/user');
const bcrypt = require('bcrypt');
const HTTP_STATUS = require('../utils/httpStatus');
const { success, failure } = require('../utils/commonResponse');
const { validationResult } = require('express-validator');
const fs = require('fs/promises');
const path = require('path');
const sendmail = require('../config/mail');
const crypto = require('crypto');
const ejs = require('ejs');
const { promisify } = require('util');
const ejsRenderFile = promisify(ejs.renderFile);
const jwt = require('jsonwebtoken');


let defaultPass = "123456";

class userController {
    async createUser(req, res, next) {

        try {
            const errors = validationResult(req);

            if (!req.file) {
                errors.errors.push({ param: 'imageUrl', msg: 'User Image is required. Only jpeg, jpg and png file is allowed!' });
            }
            if (!errors.isEmpty()) {
                if (req.file) {
                    await fs.unlink(path.join(__dirname, '..', 'images', req.file.filename));
                    console.log('file uploaded')
                }
                return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).send(failure('Invalid Inputs', errors.array()));
            }

            const name = req.body.name;
            const email = req.body.email;
            const imageUrl = 'images/' + req.file.filename;
            const password = req.body.password ? await bcrypt.hash(req.body.password, 10) : await bcrypt.hash(defaultPass, 10);
            const isAdmin = req.body.isAdmin;
            const isTrainer = req.body.isTrainer;
            let courses = req.body.courses;
            if (courses){
                courses =  Array.isArray(courses)?courses: courses.split(",");
            } else {
                courses = []
            }
            const user = new User({ name, email, imageUrl, password, isAdmin, isTrainer, courses });
            await user.save();

            const userData = {
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                isTrainer: user.isTrainer,
                courses: user.courses,
                isVerified: user.isVerified,

            };

            const changePassToken = crypto.randomBytes(32).toString('hex');
            user.changePasswordToken = changePassToken;
            await user.save();

            const changePassUrl = path.join(
                process.env.FRONTEND_URI,
                'change-password',
                changePassToken,
                user._id.toString()
            );

            const htmlStr = await ejsRenderFile(
                path.join(__dirname, "..", 'mails_ejs', 'changePass.ejs'),
                { name: user.name, email: user.email, changePassUrl: changePassUrl }
            )

            sendmail({
                from: "BJIT Training Center <training@bjitgroup.com>",
                to: email,
                subject: "Set Your Password",
                html: htmlStr
            });


            return res.status(HTTP_STATUS.OK).send(success('User is created successfully!', userData));
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }

    async setPassword(req, res, next) {
        try{
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res
                    .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
                    .send(failure('Invalid Inputs', errors.array()));
            }
            const token = req.params.token;
            const userId = req.params.userId;
            const password = req.body.password;

            const user = await User.findOne({ _id: userId})
            if (!user || user.changePasswordToken !== token) {
                return res.status(HTTP_STATUS.FORBIDDEN).send(failure('Invalid Token!'));
            }

            user.password = await bcrypt.hash(password, 10);
            user.changePasswordToken = undefined;
            user.isVerified = true
            await user.save();

            return res.status(HTTP_STATUS.OK).send(success('Reset password is successfull!', user));
        }catch(errors){

        }
    }
    async getUsers(req, res, next) {
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
            const user = await User.findById(userId).populate('courses').exec();;
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
        console.log(req.file);
        try {
            const errors = validationResult(req);

            const userId = req.params.userId;
            const updatedUser = await User.findById(userId);

            if (!errors.isEmpty()) {
                if (req.file) {
                    await fs.unlink(path.join(__dirname, '..', 'images', req.file.filename));
                }
                return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).send(failure('Invalid Inputs', errors.array()));
            }

            if (updatedUser) {
                updatedUser.name = req.body.name ? req.body.name : updatedUser.name;
                updatedUser.email = req.body.email ? req.body.email : updatedUser.email;
                updatedUser.isAdmin = req.body.isAdmin ? req.body.isAdmin : updatedUser.isAdmin;
                updatedUser.isTrainer = req.body.isTrainer ? req.body.isTrainer : updatedUser.isTrainer;
                let courseBody = req.body.courses;
                if (courseBody){
                    courseBody =  Array.isArray(courseBody)?courseBody: courseBody.split(",");
                } else {
                    courseBody = []
                }
                updatedUser.courses = req.body.courses ? courseBody : updatedUser.courses;

                if (req.file) {
                    await fs.unlink(path.join(__dirname, '..', updatedUser.imageUrl));
                    updatedUser.imageUrl = 'images/' + req.file.filename;
                }

                await updatedUser.save();
                return res.status(HTTP_STATUS.OK).send(success('User is updated successfully!', updatedUser));
            }
            return res.status(HTTP_STATUS.NOT_FOUND).send(failure('User is not found to update'))


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



}

module.exports = new userController();