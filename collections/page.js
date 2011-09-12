var lazybum = require('lazybum'),
	Collection = lazybum.get('Collection');
	
var log = lazybum.getLogger(module);

var page = Collection.extend(function() {
	page.super_.apply(this, ['page', {
    title: {type: "String", required: true},
    body: {type: "String"},
    seoUrl: {type: "String", required: true, unique: true}
	}]);

  this.addPreSaveAction(function(){
    this.seoUrl = this.title.replace(/\W/g, '-').toLowerCase();
  });
});

module.exports = page;
