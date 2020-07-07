const express = require('express');
const router = express.Router();
const pg = require('pg');

const Pool = pg.Pool; // Class

// Connect Node to our database
const pool = new Pool({
    database: 'jazzy_ajax', // name of our database
    host: 'localhost', // where is your database?
    port: 5432, // this is the default port
    max: 10, // number of connections
    idleTimeoutMillis: 10000 // 10 seconds
});

router.get('/', (req, res) => {
    console.log(`In /artist GET`);

    let queryText = `SELECT * FROM "artists";`;
    pool.query(queryText).then((result) => {
        // send back our query results as an array of objects
        res.send(result.rows); // result.rows will always be an Array
    }).catch((error) => {
        console.log(`Error in GET /artists ${error}`);
        // 500 means "server error", generic but effective
        res.sendStatus(500);
    });
    
});

router.post('/', (req, res) => {
    console.log(`In /artist POST with`, req.body);
    
    const artistToAdd = req.body;
    const queryText = `INSERT INTO "artists" ("artist_name", "year_born")
                       VALUES ($1, $2);`;
    pool.query(queryText, [artistToAdd.name, artistToAdd.born])
        .then((responseFromDatabase) => {
            console.log(responseFromDatabase);
            // 201 means "created"
            res.sendStatus(201);
        }).catch((error) => {
            console.log(`Error in POST /artist ${error}`);
            res.sendStatus(500);
        });
});

module.exports = router;