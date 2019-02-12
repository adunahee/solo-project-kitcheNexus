const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//gets food names and pantry tags for given user
router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        const queryText = `SELECT pantry_tags.name as pantry_tag_name, 
                            food.name as food_name,
                            food.id as food_id,
                            persons_food.id as pantry_id FROM person 
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

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;