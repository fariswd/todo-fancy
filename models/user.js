require('dotenv').config()
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect(process.env.DATABASE_URL);

let userSchema = new Schema({
  username:  String,
  password: String,
  isAdmin:   String
});

let User = mongoose.model('User', userSchema);

module.exports = User;