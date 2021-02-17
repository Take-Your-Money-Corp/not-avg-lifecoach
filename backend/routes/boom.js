var express = require('express');
var router = express.Router();

/* GET boom */
router.get('/', function (req, res, next) {

    res.send('HECK YEAH');
});

module.exports = router;
