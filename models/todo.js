const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let todoSchema = new Schema({
  todo: String,
  status: {
    type: Boolean,
    default: false
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  tag: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

let Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;