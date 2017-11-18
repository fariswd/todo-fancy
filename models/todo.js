require('dotenv').config()
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect(process.env.DATABASE_URL);

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
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

let Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;