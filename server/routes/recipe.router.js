const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const AUTOCOMPLETE_FOOD_URL = "https://api.edamam.com/search";
const axios = require('axios');

//gets 10 recipe search results from edamam api
router.get('/search/:str', (req, res) => {
    if (req.isAuthenticated()) {
        const queryURL = `${AUTOCOMPLETE_FOOD_URL}?q=${req.params.str}&app_id=${process.env.RECIPE_APP_ID}&app_key=${process.env.RECIPE_APP_KEY}`;
        axios.get(queryURL)
            .then(response => {
                // console.log(`food api response:`, response.data);
                const cleanedResponse = response.data.hits.map(hit => {
                    delete hit.recipe.ingredients;
                    delete hit.recipe.totalWeight;
                    delete hit.recipe.totalNutrients;
                    delete hit.recipe.totalDaily;
                    delete hit.recipe.digest;
                    return hit.recipe
                });
                res.send(cleanedResponse);
            }).catch(error => {
                console.log(`error from food api:`, error);
                res.sendStatus(500);
            })
    }
    else {
        console.log('user authenticaion failed');
        res.sendStatus(403);
    }
});

router.post('/favorite', (req, res) => {
    if (req.isAuthenticated()) {

    }

})

module.exports = router;