/**
 * Establish connection to MySQL and export to use in the application.
 */

/**
 * TODO: Modularize code by importing sql information 
 *       from different source.
 *       
 *       Database pool??? Read info on Documentation
 */

let mysql = require('mysql');
// Establish a connection to databse.
let connection = mysql.createConnection({
    host: process.env.ClEARDB_DATABASE_HOST,
    user: process.env.ClEARDB_DATABASE_USER,
    password: process.env.ClEARDB_DATABASE_PASSWORD,
    database: process.env.ClEARDB_DATABASE_DB
});

// Connect to database!
connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Connecting to db");
    }
});

module.exports = connection;
