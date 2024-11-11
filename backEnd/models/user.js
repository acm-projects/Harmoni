const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        default: "https://static-00.iconduck.com/assets.00/profile-circle-icon-256x256-cm91gqm2.png",
        required: false
    }
});

module.exports = mongoose.model('UserData', userSchema, "Credentials");
// module.exports = mongoose.model('User', userSchema);