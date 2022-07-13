const mongoose = require('mongoose')

const batchSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    startDate: {
        type: String,
        required: true
    },

    endDate: {
        type: String,
        required: true
    },

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

const Batch = new mongoose.model('Batch', batchSchema);
module.exports = Batch
