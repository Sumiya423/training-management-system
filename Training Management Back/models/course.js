const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    topics:{
        type: String,
        required: true
    }
})

const Course = new mongoose.model('Course', courseSchema);
module.exports = Course
