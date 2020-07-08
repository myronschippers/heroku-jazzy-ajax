const express = require('express');

const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;

const artistRouter = require('./routes/artist.router.js');
const songRouter = require('./routes/song.router.js');

//Required for our POST requests to work
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/artist', artistRouter);
app.use('/song', songRouter);

app.use(express.static('server/public'));

//Routes are in router files

app.listen(PORT, () => {
  console.log('listening on port', PORT);
});
