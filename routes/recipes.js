const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');

router.post('/', (req, res) => {
    let { recipeName, recipeImageURL } = req.body;
    new Recipe({userId: req.user._id, recipeName, recipeImageURL}).save( (err, recipe) => {
        if (err)
            return res.status(500).json(err);
        
        return res.json(recipe);
    });
});

router.get('/', (req, res) => {
    Recipe.find({userId: req.user._id}, (err, recipes) => {
        if (err)
            return res.status(500).json(err);
        
        return res.json(recipes);
    })
});

//PUT needed if we decide to save the recipes as "saved" or "made" or something like that.

//TODO: Delete recipe

module.exports = router;