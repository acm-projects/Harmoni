const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Date: {
        type: Date,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    
    endTime: {
        type: String,
        required: true
    },
    Duration: {
        type: Float32Array,
        required: true
    },
    Category: {
        type: String,
        required: true
    },
    Location: {
        type: String,
        required: false
    },
    Description: {
        type: String,
        required: false
    },

})

const categorySchema = new mongoose.Schema({
    event: {
        type: [eventSchema],
        required: true
    },
})

const calendarSchema = new mongoose.Schema({
    category: {
        type: [categorySchema],
        required: true
    },
})



exports.calendarSchema = calendarSchema;