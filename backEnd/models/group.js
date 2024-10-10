const mongoose = require('mongoose');


const groupSchema = new mongoose.Schema({
    groupName: {
        type: String,
        required: true
    },
    memberNames: {
        type: [String],
        required: true
    }
});


module.exports = mongoose.model('Groups', groupSchema, "Groups");