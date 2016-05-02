var express = require('express');
var router = express.Router();
var hal = require('hal');

router.get('/', function(req, res, next) {
	var resource = new hal.Resource({}, '/');

	resource.link('courses', '/courses');
	resource.link('students', '/students');
	resource.link('teachers', '/teachers');

 	res.render('index', { title: 'Root', hal: resource.toJSON() });
});

module.exports = router;
