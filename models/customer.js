const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'FirstName is required']
  },
  lastName: {
    type: String,
    required:  [true, 'LastName is required']
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
  timestamps: true
});

const Customer = mongoose.model('customer', CustomerSchema);
module.exports = Customer;