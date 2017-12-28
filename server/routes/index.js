/**
 * Custom routing for home page and for api endpoint
 */

/**
 * TODO: Create a page for handling bad requests or to routes
 *       not supported.
 * 
 *       Set up custom routing search querys rather than just
 *       sending a single index html page.
 */

// Imports
let path = require('path');                 // Path module
let router = require('express').Router();   // Express Routing
let dbPool = require('../model/mysql');      // Database

/**
 * Routes to: /
 * On index page, send the React Frontend view.
 */
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,
                           '../../client/index.html'));
});

/** 
 * Routes to: /api/eval/:query
 * On this route, the user can pass in a query param,
 * and our application will send a JSON response with the results
 * of that query.
 */
router.get('/api/eval/:query', (req, res) => {
    let userQuery = req.params.query;

    dbPool.getConnection ((err, connection) => {
        // Set up a simple SQL search by professor or course.
        let sqlCommand =`SELECT * FROM evaluations ` +
                        `WHERE professor LIKE '%${userQuery}%' || ` +
                        `course LIKE '%${userQuery}%'`

        // Query our database and respond to the request.    
        connection.query(sqlCommand, (err, results) => {
            if (results) {
                res.status(200);
                res.send(JSON.stringify({results}));
            }

            connection.release();
            if (err) {
                res.status(404);
                res.send("Bad Data");
            }
        });
    });
});

module.exports = router;
