const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    password: {
        type: String,
        require: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isTrainer: {
        type: Boolean,
        default: false
    },
    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Course'
        }
    ],
    isVerified: {
        type: Boolean,
        default: false
    },
});

const User = new mongoose.model('User', userSchema);
module.exports = User;
