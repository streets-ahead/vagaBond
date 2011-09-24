var lazybum = require('lazybum'),
	Controller = lazybum.get('Controller');
	
var log = lazybum.getLogger(module);

var admin = Controller.extend(function() {
	admin.super_.apply(this, arguments);
});

module.exports = admin;

admin.prototype.collections = ['article', 'page', 'author']

admin.prototype.index_get = function(urlParts, query) {

	
};

admin.prototype.index_post = function(urlParts, query, postData) {
	
};


