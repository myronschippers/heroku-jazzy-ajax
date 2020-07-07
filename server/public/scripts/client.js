$(document).ready(onReady);

function onReady() {
    // Add our click handler for submit artist
    $('#submit-artist').on('click', sendArtistToServer);

    // load data from the server, put it on the DOM
    getArtistData();
    getSongData();    
}

function sendArtistToServer() {
    // Put up a div blocking user input
    console.log('In function sendArtistToServer');
    // What we want to send to the server as data
    const artistToSend = {name: $('#artist-name').val(), 
                          // .val() will always return a string
                          born: $('#artist-born').val()};
    console.log(artistToSend);
    // Send the data to the server
    $.ajax({
        method: 'POST',
        url: '/artist',
        data: artistToSend
    }).then(function(response) {
        // happy path
        console.log(response);
        getArtistData();
    }).catch(function(error) {
        // unhappy path, something went wrong
        console.log('error in artist post', error);        
    });
}

// get artist data from the server
function getArtistData() {
    // Make AJAX GET request here
    $.ajax({
        method: 'GET',
        url: '/artist'
    }).then(function(response) {
        const listOfArtists = response;
        $('#artistTableBody').empty();
        for(let artist of listOfArtists) {
            // Append each artist to the table
            $('#artistTableBody').append(`<tr>
                                            <td>${artist.artist_name}</td>
                                            <td>${artist.year_born}</td>
                                          </tr>`);
        }
    }).catch(function (error) {
        console.log('error in artist get', error);
    });
}

// get song data from the server
function getSongData() {
    // Make AJAX GET request here
    $.ajax({
        method: 'GET',
        url: '/songs'
    }).then(function (response) {
        const listOfSongs = response;
        $('#songTableBody').empty();
        for (let song of listOfSongs) {
            // Append each song to the table
            $('#songTableBody').append(`<tr>
                                            <td>${song.title}</td>
                                            <td>${song.length}</td>
                                            <td>${song.date_released}</td>
                                          </tr>`);
        }
    }).catch(function (error) {
        console.log('error in song get', error);
    });
}