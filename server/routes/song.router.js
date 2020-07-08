const express = require('express');
const router = express.Router();
const pg = require('pg');
const url = require('url');

const Pool = pg.Pool; // Class

let config = {};

if (process.env.DATABASE_URL) {

  // Heroku gives a url, not a connection object
  // https://github.com/brianc/node-pg-pool
  const params = url.parse(process.env.DATABASE_URL);
  const auth = params.auth.split(':');

  config = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: true, // heroku requires ssl to be true
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
    ssl: {
      rejectUnauthorized: false
    },
  };
} else {
  config = {
    database: 'jazzy_ajax', // name of our database
    host: 'localhost', // where is your database?
    port: 5432, // this is the default port
    max: 10, // number of connections
    idleTimeoutMillis: 10000, // 10 seconds
  };
}

// Connect Node to our database
const pool = new Pool(config);

//ROUTES
router.post('/', (req, res) => {
  console.log(`In /song GET`);

  const songToAdd = req.body;
  const queryText = `INSERT INTO "songs" ("song_title", "length", "date_released")
VALUES ($1, $2, $3);`;

  pool
    .query(queryText, [
      songToAdd.sound_title,
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
module.exports = router;
