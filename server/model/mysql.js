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
let pool = mysql.createPool({
    host: process.env.CLEARDB_DATABASE_HOST,
    user: process.env.CLEARDB_DATABASE_USER,
    password: process.env.CLEARDB_DATABASE_PASSWORD,
    database: process.env.CLEARDB_DATABASE_DB
});


module.exports = pool;
