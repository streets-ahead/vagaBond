var lazybum = require('lazybum'),
	Controller = lazybum.get('Controller');
	
var log = lazybum.getLogger(module);

var page = Controller.extend(function() {
	page.super_.apply(this, arguments);
});

module.exports = page;

page.prototype.index_get = function(urlParts, query) {

	log.error("ROUTED TO PAGE: " + urlParts.length);
	
};

page.prototype.index_post = function(urlParts, query, postData) {
	
};


