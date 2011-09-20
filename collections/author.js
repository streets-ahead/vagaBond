var lazybum = require('lazybum'),
	Collection = lazybum.get('Collection'),
    crypto = require('crypto'),
    base64 = require('base64');
	
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

    this.addPreSaveAction(function(){
        if(!this._id){ //first save: create pwd hash
            var hash = crypto.createHash('sha512')
            hash.update(this.password)
            this.password = hash.digest('base64')
        }
    })
});

module.exports = author;
