var lazybum = require('lazybum'),
	Controller = lazybum.get('Controller');
	
var log = lazybum.getLogger(module);

var page = Controller.extend(function() {
	page.super_.apply(this, arguments);
});

module.exports = page;

page.prototype.helpers=['html']
page.prototype.collections = ['page']

page.prototype.index_get = function(urlParts, query) {
	
};

page.prototype.index_post = function(urlParts, query, postData) {
	
};

page.prototype.new_get = function(urlParts, query){
	var data = {
		innerTemplate: 'page/edit_form',
		title: 'Create New Page | vagaBond'
	}
	this.writeResponse(data, 'index')
}


