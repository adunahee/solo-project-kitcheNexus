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
router.post('/:name', (req, res) => {
    if (req.isAuthenticated()) {
        const foodToAddArr = req.body;
        const listName = req.params.name;
        (async () => {
            const client = await pool.connect();
            try {
                await client.query('BEGIN');
                //determines listID from db
                let queryText = `SELECT id FROM grocery_lists 
                                    WHERE person_id = ${req.user.id}
                                    AND "list_name" = $1;`;
                let values = [listName]
                const response = await client.query(queryText, values);

                //assigns listID based on previous DB response
                let listID;
                if (response.rows.length === 0) {
                    queryText = `INSERT INTO "grocery_lists" ("list_name", "person_id" ) 
                                        VALUES ( $1, ${req.user.id})
                                        RETURNING "id";`;
                    response = await client.query(queryText, values);
                    listID = response.rows[0].id;
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

router.get('/list/names', (req, res) => {
    if (req.isAuthenticated()) {
        const queryText = `SELECT list_name, id FROM "grocery_lists" WHERE person_id = ${req.user.id};`;
        pool.query(queryText)
            .then(response => {
                res.send(response.rows)
            }).catch(error => {
                console.log('error getting list names', error);
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(403);
    }
})

//creates new list for given user in db
router.post('/new-list/:listName', (req, res) => {
    if (req.isAuthenticated()) {
        const listName = req.params.listName;
        (async () => {
            const client = await pool.connect();
            try {
                await client.query('BEGIN');
                let queryText = `INSERT INTO "grocery_lists" ("list_name", "person_id" ) 
                                        VALUES ( $1, ${req.user.id} );`;
                let value = [listName];
                let response = await client.query(queryText, value);
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

router.delete('/list/:id', (req, res) => {
    if (req.isAuthenticated()) {
        const listID = req.params.id;
        // console.log(listID);

        (async () => {
            const client = await pool.connect();

            try {
                await client.query('BEGIN');
                //delete items from grocery_list
                //currently malicous user could pass other grocery list ids to delete other users stuff
                let queryText = `DELETE FROM foods_grocery_lists 
                                 WHERE grocery_list_id = $1;`;
                let values = [listID];
                let response = await client.query(queryText, values);

                //delete users grocery list
                queryText = `DELETE FROM grocery_lists 
                                 WHERE id = $1
                                 AND person_id = $2;`;
                values = [listID, req.user.id];
                response = await client.query(queryText, values);
                await client.query('COMMIT');
                res.sendStatus(200);
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
        });
    } else {
        res.sendStatus(403);
    }
})

router.delete('/item/:listId/:foodId', (req, res) => {
    if (req.isAuthenticated()) {
        const listId = req.params.listId;
        const foodId = req.params.foodId;

        (async () => {
            const client = await pool.connect();

            try {
                await client.query('BEGIN');
                //delete item from users grocery_list
                //currently malicous user could pass other grocery list ids to delete other users stuff
                let queryText = `DELETE FROM foods_grocery_lists 
                                 WHERE grocery_list_id = $1
                                 AND food_id = $2;`;
                let values = [listId, foodId];
                let response = await client.query(queryText, values);

                await client.query('COMMIT');
                res.sendStatus(200);
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
        });
    } else {
        res.sendStatus(403);
    }
})

module.exports = router;