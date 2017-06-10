const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const Diet = new Schema({
  _id: { type : Number, unique : true },
  dietName: { type : String, unique : true, required : true, dropDups: true }
});

Diet.plugin(passportLocalMongoose);

module.exports = mongoose.model( 'Diet', Diet );