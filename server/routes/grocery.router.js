const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {

});

//add items to user grocery list
router.post('/:food_id', (req, res) => {
    if (req.isAuthenticated()) {
        (async () => {
            const client = await pool.connect();
            try {
                await client.query('BEGIN');
                //first checks to see if user has default list to 
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

                //after determining food id, inserts into persons food
                queryText = `INSERT INTO "foods_grocery_lists" ("food_id", "grocery_list_id") VALUES ($1, ${listID});`;
                const result = await client.query(queryText, [req.params.food_id]);
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