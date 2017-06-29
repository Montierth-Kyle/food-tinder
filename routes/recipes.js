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
});

router.delete('/deleteRecipe/:id', (req, res) => {
    let recipeId  = req.params.id

    Recipe.remove({
        _id: recipeId
    },
    (err, recipe) => {
        if(err){
            return res.status(500).json()
        }
        return res.status(200).json()
    }
    )
});

//TODO: Delete recipe

module.exports = router;