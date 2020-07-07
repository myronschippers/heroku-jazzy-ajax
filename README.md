# Get Jazzy AJAX

- Fork
- Clone
- Create a database named `jazzy_ajax`
- Create a table named `artists` within that database 
  - SQL in the [database.sql](database.sql) file
- `npm install` to get all of the dependencies
- `npm start`
- [http://localhost:5000](http://localhost:5000)


## Base

> NOTE: For base mode, you should only need to modify server side code. Use the existing client code for testing.

- [ ] Write a `CREATE TABLE` SQL statement for the songs (add this to the [database.sql](database.sql) file).
- [ ] Add a couple sample records to the table using Postico for testing.
- [ ] Switch from returning data in the array to returning data from the database in your GET route (`song.router.js`).
    - [ ] You'll need to bring in `pg` and set up the connection in your `song.router.js` file
- [ ] Update your POST route to `INSERT INTO` the songs table (`song.router.js`).


## Stretch

- [ ] Order results by the name of the artist / song.
- [ ] Add an extra column in the database (using Postico).
- [ ] Update the HTML, JS, AJAX and server route to support the new database column.
- [ ] Move the duplicated `pg` connection code to a module.
