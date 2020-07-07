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
  idleTimeoutMillis: 10000, // 10 seconds
});

router.get('/', (req, res) => {
  console.log(`In /song GET`);

  let queryText = `SELECT * FROM "songs";`;
  pool
    .query(queryText)
    .then((result) => {
      // send back our query results as an array of objects
      res.send(result.rows); // result.rows will always be an Array
    })
    .catch((error) => {
      console.log(`Error in GET /songs ${error}`);
      // 500 means "server error", generic but effective
      res.sendStatus(500);
    });
});

//STATIC CONTENT
const songListArray = [
  {
    song_title: 'Take Five',
    length: '2:55',
    date_released: '1959-09-29',
  },
  {
    song_title: 'So What',
    length: '9:22',
    date_released: '1959-08-17',
  },
];

router.post('/', (req, res) => {
  console.log(`In /song POST with`, req.body);

  const songToAdd = req.body;
  const queryText = `INSERT INTO "songs" ("song_title", "length", "date_released")
                       VALUES ($1, $2, $3);`;
  pool
    .query(queryText, [
      songToAdd.title,
      songToAdd.length,
      songToAdd.date_released,
    ])
    .then((responseFromDatabase) => {
      console.log(responseFromDatabase);
      // 201 means "created"
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(`Error in POST /song ${error}`);
      res.sendStatus(500);
    });
});

module.exports = router;
