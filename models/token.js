const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TokenSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  }
},
{
  versionKey: false,
  timeseries: true
});

module.exports = mongoose.model('token', TokenSchema);