var lazybum = require('lazybum'),
	Controller = lazybum.get('Controller'),
	
	https = require('https'),
	qs = require('querystring'),
  crypto = require('crypto');
	
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

var GH_CLIENT_ID = '562559d16db0fdbaf0f9';
var GH_SECRET = 'fd0b9d3f3b9a631c24b2727b3a2351b62aba78fa';
var GH_BASE = 'github.com';
var GH_AUTHORIZE = '/login/oauth/authorize';
var GH_ACCESS_TOKEN = '/login/oauth/access_token';

author.prototype.login_get = function(urlParts, query) {
	this.writeResponse({}, 'login');
}

author.prototype.login_post = function(urlParts, query, postData){
  var self = this;
  var hash = crypto.createHash('sha512')
  hash.update(postData.password) //hash password
  var pwd = hash.digest('base64')
  this.author.findOne({username: postData.username, password: pwd}, function(obj){
    if(obj){
      self.reqData.session.set('author', obj, self.reqData);
      self.reqData.session.set('userLoggedIn', true, self.reqData);
      log.warn(self.reqData.session.get('goto'))
      self.redirect(self.reqData.session.get('goto'));
    }else{
      var data = { errorMsg: "Wrong username or password, jack-ass!" }
      self.writeResponse(data, 'login');
    }
  });
}

author.prototype.oauth_get = function(urlParts, query) {
	var request = 'https://' + GH_BASE + GH_AUTHORIZE + '?' +
	 			'client_id=' + GH_CLIENT_ID + '&' +
				'redirect_url=' + 'http://localhost:8888/author/oauth_callback';
				
	this.redirect(request);
}

author.prototype.edit_get = function(urlParts, query){
	var data = {
		innerTemplate: 'author/edit_form',
		title: 'Create Author | vagaBond'
	}
  this.writeResponse(data, 'index')
}


author.prototype.oauth_callback_get = function(urlParts, query) {
 	var response = qs.parse(query);

	var request =  'client_id=' + GH_CLIENT_ID + '&' +
				'client_secret=' + GH_SECRET + '&' + 
				'code=' + response.code;
	var req = https.request({
		host: GH_BASE,
		path: GH_ACCESS_TOKEN,
		method: 'POST'
	},function(res) {
		res.on('data', function(data) {
			var accessToken = qs.parse(data.toString('utf8')).access_token;
			https.get({host: GH_BASE, path: '/user.json?access_token=' + accessToken},
						function(res) {
							res.on('data', function(data) { console.log(data.toString('utf8')) });
						});
		})
	});
	
	req.write(request);
	req.end();
	
	
	//this.writeResponse({author:[]}, 'author/list');
}

author.prototype.edit_post = function(urlParts, query, postData){
	var that = this;
	var binding = this.bindInput(this.author, postData);
	if(binding.valid){
		binding.object.save(function(results, errors){
			if(errors){
				var data = {
					errors: errors,
					author: postData,
					title: 'New Author | vagaBond',
					innerTemplate: 'author/edit_form'
				}
				that.writeResponse(data, 'index')
			}else{
				that.edit_get([], null)
			}
		});
	}else{
		var data = {
			errors: binding.object,
			author: postData,
			title: 'New Author | vagaBond',
			innerTemplate: 'author/edit_form'
		}
		that.writeResponse(data, 'index')
	}
}
