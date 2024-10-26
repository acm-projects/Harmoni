const mongoose = require('mongoose');

const googleAuthSchema = new mongoose.Schema({
  access_token: String,
  refresh_token: String,
  scope: String,
  token_type: String,
  expiry_date: Number
});

module.exports = googleAuthSchema;