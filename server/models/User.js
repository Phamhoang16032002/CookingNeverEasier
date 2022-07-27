const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: 'This field is required.'
  },
  name: {
    type: String,
    required: 'This field is required.'
  },
  email: {
    type: String,
    required: 'a@gmail.com'
  },
  picture: {
    type: String,
    required: 'Avatar.png'

  },
  email_verified: {
    type: Boolean,
    required: 'false'
  },
  sub: {
    type: String,
    required: ''
  }
});


module.exports = mongoose.model('User', userSchema);