const mongoose = require('mongoose')

const batchSchema = new mongoose.Schema({

    trainerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    startDate:{
        type: String,
        required: true
    },
    endDate:{
        type: String,
        required: true
    }
})

const Course = new mongoose.model('Course', courseSchema);
module.exports = Course
