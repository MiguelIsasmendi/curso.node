var express = require('express');
var router = express.Router();
var hal = require('hal');

/* GET generic listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
