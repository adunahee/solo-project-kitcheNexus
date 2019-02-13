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

router.post('/recent', (req, res) => {
    if(req.isAuthenticated()) {
        const recipeUri = req.body.url;
        const dateViewed = req.body.timeStamp;
        (async () => {
            const client = await pool.connect();

            try {
                await client.query('BEGIN');
                
                    //tries to grab food id from db
                    let queryText = 'SELECT id FROM "recipe" WHERE encoded_uri ILIKE $1;';
                    let value = [recipeUri];
                    let recipeToAddID = 0;
                    let response = await client.query(queryText, value);
                    // console.log(response.rows);

                    //gets recipeId if one was not found and stores in insertRes
                    if (response.rows.length === 0) {
                        queryText = `INSERT INTO "recipe" (encoded_uri) 
                                        VALUES ($1)
                                        RETURNING "id";`;
                        value = [recipeUri];
                        response = await client.query(queryText, value);
                        recipeToAddID = response.rows[0].id;
                    } else {
                        recipeToAddID = response.rows[0].id;
                    }

                    //tries to get id of recipes user has already interacted with
                    queryText = 'SELECT id FROM "person_recipe" WHERE recipe_id = $1 AND person_id = $2;';
                    value = [recipeToAddID, req.user.id];
                    response = await client.query(queryText, value);
                    
                    //check response to determine if insertion or update needed
                    if(response.rows.length === 0){
                        queryText = 'INSERT INTO "person_recipe" ("person_id", "recipe_id", "last_viewed") VALUES ($1, $2, $3);';
                        value = [req.user.id, recipeToAddID, dateViewed];
                        response = await client.query(queryText, value);
                    } else {
                        queryText = 'UPDATE "person_recipe" SET "last_viewed" = $1 WHERE person_id = $2;';
                        value = [dateViewed, req.user.id];
                        response = await client.query(queryText, value);
                    }
                    //after determining food id, inserts into persons food
                    

                await client.query('COMMIT');
                res.sendStatus(201);
            } catch (e) {
                console.log('ROLLBACK', e);
                await client.query('ROLLBACK');
                throw e;
            } finally {
                client.release();
            }
        })().catch((error) => {
            console.log('CATCH', error);
            res.sendStatus(500);
        })
    }
    else {
        res.sendStatus(403);
    }
})

module.exports = router;