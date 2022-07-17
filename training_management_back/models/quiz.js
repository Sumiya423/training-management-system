const mongoose = require('mongoose')

const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    score: {
        type: mongoose.Types.Decimal128,
        required: true
    },
    trainee: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    }
})

const quiz = new mongoose.model('Quiz', quizSchema);
module.exports = quiz
