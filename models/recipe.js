const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Recipe = new Schema({
    userId: { type: String, required: true },
    recipeName: { type: String },
    recipeImageURL: { type: String }
});

module.exports = mongoose.model('Recipe', Recipe);