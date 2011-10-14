var lazyBum = require('lazyBum'),
    crypto = require('crypto'),
    base64 = require('base64');

var useSessionAuthentication = function(reqData){
  var loggedIn = reqData.session.get('userLoggedIn');
  if(!loggedIn){
    this.redirect('/users/authenticate.html');
    return true;
  }
}
var authenticate = {
  	collections: ['author'],
  	helpers: ['config', "strings"],

	useBasicAuthentication : function() {
		var self = this;
		if(self.reqData.request.headers['authorization']){
			var authParts = this.reqData.request.headers['authorization'].split(' ')
			var authType = authParts[0]
			var authString = authParts[1]

			if(authType.toUpperCase() === 'BASIC'){
				authString = base64.decode(authString);
				var userpass = authString.split(':');
				var hash = crypto.createHash('sha512')
				hash.update(userpass[1]) //hash password
				var pwd = hash.digest('base64')

				var self = this;
				this.author.find({username: userpass[0], password: pwd}, function(results){
					if(results && results.length==1){
					auth = true;
					self.reqData['auth_status'] = { user: userpass[0], authenticated: true}
					self.hookComplete();
					}else{
					 self.sendAuthorizationRequired();
					}
				})
				
				return true;
			} 
		}
		
		return false;
	},
	
	useSessionAuthentication : function() {
    console.log(this);
		var loggedIn = authenticate.reqData.session.get('userLoggedIn');
		if(!loggedIn) {
			self.redirect('/users/authenticate.html');
			return true;
		} 
	},

	run: function() {
		var self = this;
		var url = self.reqData.request.url
		var method = this.reqData.request.method
		var config = this.config.getConfig();
		if(isSecure(url, method, config.secureRoutes)){
			var auth = false;
			var extension = self.strings.getExtension(url);
			if(extension === null || extension === 'html') {
				auth = useSessionAuthentication(this.reqData);
			} else {
				auth = self.useBasicAuthentication();				
			}
		}
	/*	
		if(!auth){
			this.sendAuthorizationRequired();
			return;
		}
		*/
		self.hookComplete()
	}
}	

var isSecure = function(url, method, secureRoutes){
 	var isSecure = false;

	for(var i in secureRoutes){
		var route = secureRoutes[i]
		var secureMethod = false;
		if(route.methods === '*') {
			secureMethod = true;
		} else if(route.methods.indexOf(method.toLowerCase()) >- 1) {
			secureMethod = true;
		}
		console.log(route.route);
		console.log(url);
		if(url.match(route.route) !== null && secureMethod){
			console.log('SECURE ROUTE');
	  		return true;
		} 
  	}
	console.log('SECURE ROUTE ' + isSecure);
  	return isSecure;
}

module.exports = authenticate;
