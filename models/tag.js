require('dotenv').config()
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect(process.env.DATABASE_URL);

let tagSchema = new Schema({
  status: {
    type: Boolean,
    default: false
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  fromId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  from: String,
  todo: String,
  todoId: {
    type: Schema.Types.ObjectId,
    ref: 'Todo'
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }
});

let Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;