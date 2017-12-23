let path = require('path');
let router = require('express').Router();
let dbCon = require('../model/mysql');

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname,
                           '../../client/index.html'));
});



router.get('/api/eval/:query', function (req, res) {
    console.log(req.params);
    let userQuery = req.params.query;
    let sqlCommand =`SELECT * FROM evaluations ` +
                     `WHERE professor LIKE '%${userQuery}%' || ` +
                     `course LIKE '${userQuery}'`
    dbCon.query(sqlCommand, (err, results) => {
        if (err) {
            console.log(err);
            res.send("nothing");
        } else {
            // for (id in results) {
            //     console.log(results[id]);
            // }
            res.send(JSON.stringify({results}));
        }
    });
});

module.exports = router;

