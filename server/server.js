const express = require('express');
const pg = require('pg');

const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;
const Pool = pg.Pool;
const pool = new Pool({
  //"I want to create a new instance of 'pool' with these configurations."
  database: 'jazzy_ajax',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 3000,
  ssl: {
    rejectUnauthorized: false
  },
}); //All info needed to connect to database

const artistRouter = require('./routes/artist.router.js');
const songRouter = require('./routes/song.router.js');

//Required for our POST requests to work
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/artist', artistRouter);
app.use('/song', songRouter);

app.use(express.static('server/public'));

pool.on('connect', () => {
  console.log('Postgres Connected');
});

pool.on('error', (error) => {
  console.log('Postgres Error');
});

//Routes are in router files

app.listen(PORT, () => {
  console.log('listening on port', PORT);
});
