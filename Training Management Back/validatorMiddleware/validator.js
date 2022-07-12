const { body } = require('express-validator');
const User = require('../models/user');

const validator = {
    createUser: [
        body('name').trim().notEmpty().isString().withMessage('Name is required and must be string'),
        body('email').trim().isEmail().withMessage('E-mail is invalid').custom(async (value) => {
            const user = await User.findOne({ email: value }).exec();
            if (user) {
                return Promise.reject("E-mail is already exists!");
            }
            return true;
        })
    ]
};

module.exports = validator;