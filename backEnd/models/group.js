const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    groupName: {
        type: String,
        required: true
    },
    memberEmails: {
        type: [String],
        required: true
    }
});

/* Mathew's Schema for Poll's. Just change how polling works
const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  members: [{ type: String, required: true }] // Array of user emails
});
*/

/*
const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
*/


module.exports = mongoose.model('Groups', groupSchema, "Groups");

