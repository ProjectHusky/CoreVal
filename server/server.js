/**
 * Use the express module to handle routing and create our server.
 */

// Modules
let path = require('path');
let fs = require('fs');
let express = require('express');

// Imports
let indexRoutes = require('./routes');

// Create the app
let app = express();

app.set('view engine', 'html');
app.engine('html', function (path, options, callbacks) {
    fs.readFile(path, 'utf-8', callback);
});

// Middleware
app.use(express.static(path.join(__dirname, '../client')));

// Routes
app.use(indexRoutes);

// Error handle
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
});

module.exports = app;
