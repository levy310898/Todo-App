const mongoose = require('mongoose');

const Schema = mongoose.Schema;


// setting schema
const FeatureSchema = new Schema({
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
  projectId: {
    type: Schema.Types.ObjectId,
    ref: 'projects'
  },
  status: {
    type: String,
    enum:['todo','doing','testing','done']
  }
})

module.exports = mongoose.model('features', FeatureSchema);