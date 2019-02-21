const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//gets food names and pantry tags for given user
router.get('/food', (req, res) => {
    console.log('in pantry food get');
    
    if (req.isAuthenticated()) {
        const queryText = `SELECT pantry_tags.name as pantry_tag_name, 
                            food.name as food_name,
                            food.id as food_id,
                            persons_food.id as persons_food_id,
                            persons_food.date_added,
                            pantry_tags.id as tag_id FROM person 
                            JOIN persons_food ON person.id = persons_food.persons_id
                            JOIN pantry_tags ON pantry_tags.id = persons_food.pantry_tags_id
                            JOIN food ON food.id = persons_food.food_id
                            WHERE person.id = $1;`;
        pool.query(queryText, [req.user.id])
            .then(response => {
                // console.log(response.rows);
                res.send(response.rows);
            }).catch(error => {
                res.sendStatus(500);
                console.log('error getting pantry', error);
            })
    }
    else {
        res.sendStatus(403);
    }
})

//posts authenticated users food item to their pantry, checks for repeat entries in food table
router.post('/', (req, res) => {
    if (req.isAuthenticated()) {
        // console.log(req.body);
        const foodToAddArr = req.body;
        (async () => {
            const client = await pool.connect();

            try {
                await client.query('BEGIN');
                for (foodToAdd of foodToAddArr) {
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
                        foodToAddID = response.rows[0].id;
                    }
                    //after determining food id, inserts into persons food
                    queryText = 'INSERT INTO "persons_food" ("persons_id", "food_id") VALUES ($1, $2);';
                    const result = await client.query(queryText, [req.user.id, foodToAddID]);
                }

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

 //tries deleting each food from pantry sent in array, put used for body access
router.put('/delete', (req, res) => {
    console.log('in pantry delete',req.body);
    
    if (req.isAuthenticated()) {
        (async () => {
            const client = await pool.connect();
            try {
                const queryText = `DELETE FROM persons_food WHERE persons_id = $1 AND id = $2;`;
                const values = req.body;
                let queryValue;
                for (obj of values) {
                    queryValue = [req.user.id, obj.persons_food_id]
                    const response = await client.query(queryText, queryValue)
                }

                await client.query('COMMIT')
                res.sendStatus(200);
            } catch (e) {
                console.log('ROLLBACK', e);
                await client.query('ROLLBACK');
                throw e;
            } finally {
                client.release();
            }
        })().catch( e => {
            console.log('CATCH', e);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403);
    }
});

router.put('/tags', (req, res) => {
    console.log('in pantry tags put');
    if(req.isAuthenticated()){
        const foodArr = req.body;
        (async () => {
            const client = await pool.connect();
            try {
                const queryText = `UPDATE persons_food SET pantry_tags_id = $1
                                    WHERE persons_id = $2 AND id = $3;`;
                for (obj of foodArr) {
                    const values = [obj.tag_id, req.user.id, obj.persons_food_id];
                    await client.query(queryText, values);
                }
                await client.query('COMMIT')
                res.sendStatus(200);
            } catch (e) {
                console.log('ROLLBACK', e);
                await client.query('ROLLBACK');
                throw e;
            } finally {
                client.release();
            }
        })().catch(e => {
            console.log('CATCH', e);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403);
    }
})

router.get('/tags', (req, res) => {
    console.log('in pantry tags get');
    if(req.isAuthenticated()){
        const queryText = `SELECT * FROM pantry_tags;`;
        pool.query(queryText)
            .then(response => {
                // console.log(response.rows);
                res.send(response.rows);
            }).catch(error => {
                res.sendStatus(500);
                console.log('error getting pantry', error);
            })
    }else {
        res.sendStatus(403);
    }
})

module.exports = router;