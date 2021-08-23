const mongoose = require('mongoose');

const Schema = mongoose.Schema;


// setting schema
const UserSchema = new Schema({
  name: {
    type: String,
    require:true,
  },
  email: {
    type: String,
    require: true,
    unique:true
  },
  password: {
    type: String,
    require:true
  },
  createdAt: {
    type: Date,
    default:Date.now
  }
})

module.exports = mongoose.model('users', UserSchema);