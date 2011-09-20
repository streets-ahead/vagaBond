var lazybum = require('lazybum'),
	Controller = lazybum.get('Controller');
	
var log = lazybum.getLogger(module);

var page = Controller.extend(function() {
	page.super_.apply(this, arguments);
});

module.exports = page;

page.prototype.helpers=['html', 'markdown']
page.prototype.collections = ['page']

page.prototype.index_get = function(urlParts, query) {
	var that = this;
	if(urlParts.length == 1){
		var seo = urlParts[0]
		this.page.find({seoUrl: seo}, function(results, errors){
			if(!results && results.length!=1){
				that.showNotFound(404);
			}else{
				var data = {
					page: results[0],
					innerTemplate: 'page/display',
					title: results[0].title
				}
				that.writeResponse(data, 'index')
			}
		})
	}else{ //for now we only go to pages by seoUrl - all others fail.
		this.showNotFound(404);
	}
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

page.prototype.new_post = function(urlParts, query, postData){
	var that = this;
	var binding = this.bindInput(this.page, postData);
	if(binding.valid){
		binding.object.save(function(results,errors){
			if(results){
				that.redirect('/' + results[0].seoUrl)
			}else{
				var data = {
					title: 'Create New Page | vagaBond',
					innerTemplate: 'page/edit_form',
					page: postData,
					errors: errors
				}
				that.writeResponse(data, 'index')
			}
		})
	}else{
		var data = {
			title: 'Create New Page | vagaBond',
			innerTemplate: 'page/edit_form',
			page: postData,
			errors: binding.object
		}
		that.writeResponse(data, 'index');
	}
}