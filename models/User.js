const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  age: {
    type: Number
  },
  posts: {
    type: Array
  }
});

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;
