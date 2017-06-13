const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');
const Yummly = require('../node_modules/yummly-api/yummly.js');
const yummly = new Yummly()

router.get('/:id', (req, res) => {
    yummly.setDiets(req.params.id);
    yummly.setMaxResults(1)
    yummly.getRecipes( recipes => {
        console.log(recipes)
        return res.json(recipes);

    })
});

//PUT needed if we decide to save the recipes as "saved" or "made" or something like that.

//TODO: Delete recipe

module.exports = router;