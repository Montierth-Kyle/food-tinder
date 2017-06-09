const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
  email: { type : String, unique : true, required : true, dropDups: true },
  password: { type : String },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dietPreferences: { type: Array, required: true }
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model( 'User', User );