const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'First Name is required']
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required']
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  role: {
    type: String,
    required: [true, 'Role is required']
  }
},
{
  versionKey: false,
  timeseries: true
});

const User = mongoose.model('user', UserSchema);
module.exports = User;