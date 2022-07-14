const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const HTTP_STATUS = require('../utils/httpStatus');
const { success, failure } = require('../utils/commonResponse');
const { validationResult } = require('express-validator');
// const sendmail = require('../config/mail');
const path = require('path');
const crypto = require('crypto');
const ejs = require('ejs');
const { promisify } = require('util');
const ejsRenderFile = promisify(ejs.renderFile);

class authController{

    async signin(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).send(failure('Invalid Inputs', errors.array()));
            }
            
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(HTTP_STATUS.UNAUTHORIZED).send(failure('Unauthorized user login.'));
            }

            const passMatch = await bcrypt.compare(req.body.password, user.password)
            if (!passMatch) {
                return res.status(HTTP_STATUS.UNAUTHORIZED).send(failure('Unauthorized user login. Password is incorrect'));
            }

            const userData = {
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                isTrainer: user.isTrainer,
            };
            const jwtToken = jwt.sign(userData, process.env.JWT_SECRET_KEY, { expiresIn: '12h' });
            const resData = {
                access_token: jwtToken,
                ...userData
            }

            return res.status(HTTP_STATUS.OK).send(success('Signed in successfully!', resData));

        } catch (error) {
            console.log(error);
            next(error);
        }
    }

}

module.exports = new authController();