const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/groceries', (req, res) => {
    if (req.isAuthenticated()) {
        const queryText = `SELECT * FROM grocery_lists 
	    JOIN foods_grocery_lists ON foods_grocery_lists.grocery_list_id = grocery_lists.id
        JOIN food ON food.id = foods_grocery_lists.food_id
	    WHERE grocery_lists.person_id = $1
	    GROUP BY grocery_lists.list_name, grocery_lists.person_id, grocery_lists.id, foods_grocery_lists.id, food.id;`;
        pool.query(queryText, [req.user.id])
            .then(response => {
                // console.log(response.rows);
                res.send(response.rows);
            }).catch(error => {
                console.log('error getting groceries:', error);
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(403);
    }
});

//add items to user grocery list
router.post('/', (req, res) => {
    if (req.isAuthenticated()) {
        const foodToAddArr = req.body;
        (async () => {
            const client = await pool.connect();
            try {
                await client.query('BEGIN');
                //determines listID
                let queryText = `SELECT id FROM grocery_lists 
                                    WHERE person_id = ${req.user.id}
                                    AND "list_name" = 'Shopping List';`;

                //tries to grab food id from db
                const response = await client.query(queryText);
                // console.log(response.rows);
                let listID;

                //gets listID if one was not found and stores in insertRes
                if (response.rows.length === 0) {
                    queryText = `INSERT INTO "grocery_lists" ("list_name", "person_id" ) 
                                        VALUES ('Shopping List', ${req.user.id})
                                        RETURNING "id";`;
                    const insertRes = await client.query(queryText);
                    listID = insertRes.rows[0].id;
                } else {
                    listID = response.rows[0].id;
                }

                for (foodToAdd of foodToAddArr) {
                //first checks to see if user has default list to 
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
                queryText = `INSERT INTO "foods_grocery_lists" ("food_id", "grocery_list_id") VALUES ($1, ${listID});`;
                const result = await client.query(queryText, [foodToAddID]);
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
    } else {
        res.sendStatus(403);
    }
});

module.exports = router;