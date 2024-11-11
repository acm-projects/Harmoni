const mongoose = require('mongoose');


const pollSchema = new mongoose.Schema({
    groupName: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    options: {
        type: [String],
        required: true
    },
    votes: {
        type: [Number],
        required: true
    }
})

mongoose.model('Polls', pollSchema, "Polls");