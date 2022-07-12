const User = require('../models/user');
const HTTP_STATUS = require('../utils/httpStatus');
const { success, failure } = require('../utils/commonResponse');
const { validationResult } = require('express-validator');

let defaultPass = 123456;

class userController {

    async createUser(req, res, next){
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).send(failure('Invalid Inputs', errors.array()));
            }

            const name = req.body.name;
            const email = req.body.email;
            const password = defaultPass; 
            const isAdmin = req.body.isAdmin;
            const isTrainer = req.body.isTrainer;
            const user = new User({ name, email, password, isAdmin, isTrainer});
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
        catch(error) {
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