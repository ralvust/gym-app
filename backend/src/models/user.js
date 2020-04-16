const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  name: String,
  password: String
});

module.exports = mongoose.model('User', userSchema);