const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const AUTOCOMPLETE_FOOD_URL = "https://api.edamam.com/search";
const axios = require('axios');
const moment = require('moment');

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
    if (req.isAuthenticated()) {
        const recipeUri = req.body.url;
        const dateViewed = req.body.timeStamp;
        console.log(dateViewed);

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
                if (response.rows.length === 0) {
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

router.get('/recent', (req, res) => {
    if (req.isAuthenticated()) {
        //begin checking db recents, then getting recipes from api, then sending back to client
        (async () => {
            const client = await pool.connect();

            try {
                //gets users recently viewed recipes
                const oneWeekAgo = moment().subtract(7, 'days').format('YYYY-MM-DD');
                // console.log("week old date", oneWeekAgo);
                let queryText = `SELECT recipe.encoded_uri FROM person_recipe
	                        JOIN recipe ON recipe.id = person_recipe.recipe_id
	                        WHERE person_recipe.person_id = $1
                            AND last_viewed >= '${oneWeekAgo}'::date
                            LIMIT 5;`
                let value = [req.user.id];
                let response = await pool.query(queryText, value);

                //use recent recipes array to query api and build client response
                let recentRecipes = [];

                for (recent of response.rows) {

                    const queryURL = `${AUTOCOMPLETE_FOOD_URL}?r=${recent.encoded_uri}&app_id=${process.env.RECIPE_APP_ID}&app_key=${process.env.RECIPE_APP_KEY}`;
                    let response = await axios.get(queryURL);
                    // console.log(`recipe response:`, response.data);
                    const cleanedResponse = response.data.map( recipe => {
                        delete recipe.ingredients;
                        delete recipe.totalWeight;
                        delete recipe.totalNutrients;
                        delete recipe.totalDaily;
                        delete recipe.digest;
                        return recipe
                    });
                    recentRecipes = [...recentRecipes, ...cleanedResponse]; 
                }
                // console.log(recentRecipes);
                //sends finished recent recipe list to client
                res.send(recentRecipes);
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