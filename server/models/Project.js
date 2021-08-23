const mongoose = require('mongoose');

const Schema = mongoose.Schema;


// setting schema
const ProjectSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref:'users'
  },
  members: [{
    type: Schema.Types.ObjectId,
    ref:'users'
  }]
})

module.exports = mongoose.model('projects', ProjectSchema);