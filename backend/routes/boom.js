var express = require('express');
var router = express.Router();

/* GET boom */
router.get('/', function (req, res, next) {

    res.send('BOOM!');
});

module.exports = router;
