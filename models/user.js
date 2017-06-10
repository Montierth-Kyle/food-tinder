const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
  email: { type : String, unique : true, required : true, dropDups: true },
  firstName: { type : String },
  lastName: { type : String },
  dietId: { type : Number }
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model( 'User', User );