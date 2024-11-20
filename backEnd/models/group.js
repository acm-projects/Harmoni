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

module.exports = mongoose.model('Group', groupSchema, "Groups");   //I had to change the model's name. It does not change the collection name or stored data in MongoDB.
