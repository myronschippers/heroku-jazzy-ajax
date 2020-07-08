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

router.get('/', (req, res) => {
  console.log(`In /artist GET`);

  let queryText = `SELECT * FROM "artists";`;
  pool
    .query(queryText)
    .then((result) => {
      // send back our query results as an array of objects
      res.send(result.rows); // result.rows will always be an Array
    })
    .catch((error) => {
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
  pool
    .query(queryText, [artistToAdd.name, artistToAdd.born])
    .then((responseFromDatabase) => {
      console.log(responseFromDatabase);
      // 201 means "created"
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(`Error in POST /artist ${error}`);
      res.sendStatus(500);
    });
});

module.exports = router;
