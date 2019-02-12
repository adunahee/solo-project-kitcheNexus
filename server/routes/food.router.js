const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const AUTOCOMPLETE_FOOD_URL = "http://api.edamam.com/auto-complete";
const axios = require('axios');

//gets autocomplete suggestions from food API
router.get('/:str', (req, res) => {
    if (req.isAuthenticated()) {
        const queryURL = `${AUTOCOMPLETE_FOOD_URL}?q=${req.params.str}&limit=10&app_id=${process.env.FOOD_APP_ID}&app_key=${process.env.FOOD_API_KEY}`;
        axios.get(queryURL)
            .then(response => {
                console.log(`food api response:`, response.data);
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

router.delete('/:id', (req, res) => {
    if (req.isAuthenticated()) {
        const queryText = `DELETE FROM persons_food WHERE id = $1 AND persons_id = $2;`;
        pool.query(queryText, [req.params.id, req.user.id])
            .then(response => {
                res.sendStatus(200);
            }).catch(error => {
                console.log('error deleting from pantry:', error);
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(403);
    }
})

//posts authenticated users food item to their pantry, checks for repeat entries in food table
router.post('/:food', (req, res) => {
    if (req.isAuthenticated()) {

        const foodToAdd = req.params.food;

        (async () => {
            const client = await pool.connect();

            try {
                await client.query('BEGIN');
                let queryText = 'SELECT id FROM "food" WHERE food.name ILIKE $1;';
                const value = [foodToAdd];
                let foodToAddID = 0;
                //tries to grab food id from db
                const response = await client.query(queryText, value);
                // console.log(response.rows);


                //gets foodId if one was not found and stores in insertRes
                if (response.rows.length === 0) {
                    queryText = `INSERT INTO "food" (name) 
                                        VALUES ($1)
                                        RETURNING "id";`;
                    const value = [foodToAdd];
                    const insertRes = await client.query(queryText, value);
                    foodToAddID = insertRes.rows[0].id;
                } else {
                    foodToAddID = response.rows[0].id
                }

                //after determining food id, inserts into persons food
                queryText = 'INSERT INTO "persons_food" ("persons_id", "food_id") VALUES ($1, $2);';
                const result = await client.query(queryText, [req.user.id, foodToAddID]);
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
});

module.exports = router;