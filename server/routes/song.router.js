const express = require('express');
const router = express.Router();

// static content. this will be replaced with a database table
const songListArray = [
    {
        title: 'Take Five',
        length: '2:55',
        date_released: '1959-09-29'
    },
    {
        title: 'So What',
        length: '9:22',
        date_released: '1959-08-17'
    }
];

router.get('/', (req, res) => {
    console.log(`In /songs GET`);
    res.send(songListArray);
});

router.post('/', (req, res) => {
    
    res.sendStatus(201);
});

module.exports = router;