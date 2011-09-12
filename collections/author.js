var lazybum = require('lazybum'),
	Collection = lazybum.get('Collection');
	
var log = lazybum.getLogger(module);

var author = Collection.extend(function() {
	author.super_.apply(this, ['author', {
    fullname: {type: 'String', required: true},
    username: {type: 'String', required: true, unique: true},
    password: {type: 'String', required: true},
    email: {type: 'String'},
    twitter: {type: 'String'},
    bio: {type: 'String'}
	}]);
});

module.exports = author;
