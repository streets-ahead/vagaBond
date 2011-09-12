var lazybum = require('lazybum'),
	Controller = lazybum.get('Controller');
	
var log = lazybum.getLogger(module);

var author = Controller.extend(function() {
	author.super_.apply(this, arguments);
});

module.exports = author;

author.prototype.helpers=['html']
author.prototype.collections = ['author']

author.prototype.index_get = function(urlParts, query) {
	this.redirect('/article')
};

author.prototype.index_post = function(urlParts, query, postData) {
	
};

author.prototype.edit_get = function(urlParts, query){
	var data = {
		innerTemplate: 'author/edit_form',
		title: 'Create Author | vagaBond'
	}
  this.writeResponse(data, 'index')
}

author.prototype.edit_post = function(urlParts, query, postData){
	var that = this;
	var binding = this.bindInput(this.author, postData);
	if(binding.valid){
		binding.object.save(function(results, errors){
			if(errors){
				that.rePostWithErrors(postData, errors)
			}else{
				that.edit_get([], null)
			}
		});
	}else{
		rePostWithErrors(postData, binding.object)
	}
}
