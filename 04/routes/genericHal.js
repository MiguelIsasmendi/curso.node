var express = require('express');
var hal = require('hal');

module.exports = function(title, anObject, resourceConfigurationCallback){
	var object = anObject || {};
	var router = express.Router();
	router.get('/', function(req, res, next) {
	  	var resource = new hal.Resource(object, '/');

	  	resource.link('back', '../');

	  	if(resourceConfigurationCallback)
			resourceConfigurationCallback(resource);

	 	res.render('hal_links', { title: title, hal: resource.toJSON() });
	});
	return router};
