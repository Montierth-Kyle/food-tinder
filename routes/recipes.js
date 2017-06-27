const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');
const request = require('request')

const app_id = process.env.APP_ID
const app_key = process.env.APP_KEY

router.get('/', (req, res) => {
    Recipe.find({}, (err, recipes) => {
        return res.json(recipes)
    });
});

router.get('/:id', (req, res) => {
    request(`https://api.yummly.com/v1/api/recipes?_app_id=${app_id}&_app_key=${app_key}&requirePictures=true&maxResult=30&start=10&alloweddiet%5B%5D=${req.params.id}`, function (error, response, body) {
        let json = JSON.parse(body);
        res.json(json.matches) 
    })
});

router.post('/saveRecipe', (req, res) => {
    let { userId } = req.props
    Recipe.save({ userId: req.props.userId }, (err, recipe) => {
        if (err)
            return
    })
})

//PUT needed if we decide to save the recipes as "saved" or "made" or something like that.

//TODO: Delete recipe

module.exports = router;