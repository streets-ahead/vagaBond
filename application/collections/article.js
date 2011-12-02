var lazybum = require('lazyBum'),
	Collection = lazybum.get('Collection');
	
var log = lazybum.getLogger(module);

var article = Collection.extend(function() {
	article.super_.apply(this, ['article', {
    title: {type: 'String', required: true},
    body: {type: 'String', required: true},
    seoUrl: {type: 'String', requied: true, unique: true},
    publishDate: {type: 'Date'},
    updatedDate: {type: 'Date'},
    tags: {type: 'Array'},
    author: {type: 'String', required:true}
	}]);

  this.addPreSaveAction(function(){
    this.seoUrl = this.title.replace(/\W/g, '-').toLowerCase();
    this.updatedDate = new Date();
  });
});

module.exports = article;
