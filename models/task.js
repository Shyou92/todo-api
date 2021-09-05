const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 400,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  important: {
    type: Boolean,
    default: false,
    required: false,
  },
  isComplete: {
    type: Boolean,
    default: false,
    required: false,
  },
  createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('task', taskSchema);