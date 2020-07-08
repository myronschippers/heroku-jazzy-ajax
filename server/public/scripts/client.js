$(document).ready(onReady);

function onReady() {
  // Add click handler for submit artist
  $('#submit-artist').on('click', sendArtistToServer);
  //Add click handler for submit song
  $('#submit-song').on('click', sendSongToServer);

  //Load data from the server, put it on the DOM
  getArtistData();
  getSongData();
}

//This is the function that runs when the button to submit an artist is clicked
function sendArtistToServer() {
  console.log('In function sendArtistToServer');
  //What we want to send to the server as data
  const artistToSend = {
    name: $('#artist-name').val(),
    //.val() returns a string
    born: $('#artist-born').val(),
  };
  console.log(artistToSend);
  //Send (post) data to server with $.ajax request
  $.ajax({
    method: 'POST',
    url: '/artist',
    data: artistToSend,
  })
    .then(function (response) {
      //Good path
      console.log(response);
      getArtistData();
    })
    .catch(function (error) {
      //Error path
      console.log('error in artist post', error);
    });
}

//After the data is sent (posted) to the server, we get the data to post it on the DOM
function getArtistData() {
  //$.ajax request
  $.ajax({
    method: 'GET',
    url: '/artist',
  })
    .then(function (response) {
      //Good path
      const listOfArtists = response;
      $('#artistTableBody').empty();
      for (let artist of listOfArtists) {
        //Append artists to table
        $('#artistTableBody').append(`<tr>
                                            <td>${artist.artist_name}</td>
                                            <td>${artist.year_born}</td>
                                          </tr>`);
      }
    })
    .catch(function (error) {
      //Error path
      console.log('error in artist get', error);
    });
}

//This is the function that runs when the button to submit a song is clicked
function sendSongToServer() {
  console.log('In function sendSongToServer');
  //What we want to send to the server as data
  const songToSend = {
    title: $('#song-name').val(),
    //.val() returns a string
    length: $('#song-length').val(),

    date_released: $('#date-released').val(),
  };
  console.log(songToSend);
  //$.ajax request
  $.ajax({
    method: 'POST',
    url: '/song',
    data: songToSend,
  })
    .then(function (response) {
      //Good path
      console.log(response);
      getSongData();
    })
    .catch(function (error) {
      //Error path
      console.log('Error in song post', error);
    });
}

//After the data is sent (posted) to the server, we get the data to post it on the DOM
function getSongData() {
  console.log('In function getSongData');
  //What we want to send to the server as data
  $.ajax({
    method: 'GET',
    url: '/song',
  })
    .then(function (response) {
      console.log(response);
      const listOfSongs = response;
      $('#songTableBody').empty();
      for (let song of listOfSongs) {
        //Append songs to table
        $('#songTableBody').append(`<tr>
                                            <td>${song.song_title}</td>
                                            <td>${song.length}</td>
                                            <td>${song.date_released}</td>
                                          </tr>`);
      }
    })
    .catch(function (error) {
      //Error path
      console.log('error in song get', error);
    });
}
