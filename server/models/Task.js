const mongoose = require('mongoose');

const Schema = mongoose.Schema;


// setting schema
const TaskSchema = new Schema({
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
  featureId: {
    type: Schema.Types.ObjectId,
    ref: 'features'
  },
  isDone: {
    type:Boolean,
  },
  estimateTime: {
    type:Number,
  }
})

module.exports = mongoose.model('tasks', TaskSchema);