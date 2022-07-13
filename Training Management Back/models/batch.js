const mongoose = require('mongoose')

const batchSchema = new mongoose.Schema({

    trainers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
    ],
    trainees: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
    ],
    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Course'  
        }
    ]
})

const Course = new mongoose.model('Course', courseSchema);
module.exports = Course
