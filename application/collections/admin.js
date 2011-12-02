var lazybum = require('lazyBum'),
	Collection = lazybum.get('Collection');
	
var log = lazybum.getLogger(module);

var admin = Collection.extend(function() {
	admin.super_.apply(this, ['admin', {
    theme: {type: 'String', default: 'default'},
    home: {type: 'String'}
	}]);
});

module.exports = admin;
