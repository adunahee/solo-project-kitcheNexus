const express = require('express');
const router = express.Router();
const AUTOCOMPLETE_FOOD_URL = "http://api.edamam.com/auto-complete";
const axios = require('axios');

//gets autocomplete suggestions from food API
router.get('/:str', (req, res) => {
    if (req.isAuthenticated()) {
        const queryURL = `${AUTOCOMPLETE_FOOD_URL}?q=${req.params.str}&limit=10&app_id=${process.env.FOOD_APP_ID}&app_key=${process.env.FOOD_APP_KEY}`;
        axios.get(queryURL)
            .then(response => {
                // console.log(`food api response:`, response.data);
                res.send(response.data);
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

module.exports = router;