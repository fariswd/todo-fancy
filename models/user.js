const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    validate: {
      validator: function (v){
        return /\w[-._\w]*\w@\w[-._\w]*\w\.\w{2,3}/.test(v)
      }
    }
  },
  password: String,
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

let User = mongoose.model('User', userSchema);

module.exports = User;