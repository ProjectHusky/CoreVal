let mysql = require('mysql');
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'secretPassword',
    database: 'coreval'
});

connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Connecting to db");
    }
});

module.exports = connection;