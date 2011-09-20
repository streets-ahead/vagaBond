var lazyBum = require('lazyBum'),
    crypto = require('crypto'),
    base64 = require('base64');

var authenticate = {
  collections: ['author'],
  helpers: ['config'],

  run: function() {
  		var that = this;
		var url = this.reqData.request.url
		var method = this.reqData.request.method
		var config = this.config.getConfig();
		if(isSecure(url, method, config.secureRoutes)){
			var auth = false
			if(this.reqData.request.headers['authorization']){
				var authParts = this.reqData.request.headers['authorization'].split(' ')
				var authType = authParts[0]
				var authString = authParts[1]

				if(authType.toUpperCase() === 'BASIC'){
					authString = base64.decode(authString);
					var userpass = authString.split(':');
					var hash = crypto.createHash('sha512')
					hash.update(userpass[1]) //hash password
					var pwd = hash.digest('base64')

					var that = this;
					this.author.find({username: userpass[0], password: pwd}, function(results){
						if(results && results.length==1){
						auth = true;
						that.reqData['auth_status'] = { user: userpass[0], authenticated: true}
						that.hookComplete();
						}else{
						 that.sendAuthorizationRequired();
						}
					})

				  	return;
				}
			}

			if(!auth){
				this.sendAuthorizationRequired();
				return;
			}
		
		}

		this.hookComplete();
  	}
}

var isSecure = function(url, method, secureRoutes){
 	var isSecure = false;

 	if(method.toUpperCase() === "POST"){
 		return true;
 	}

	for(var i in secureRoutes){
		var route = secureRoutes[i]
		if(route.route.toUpperCase() === url.toUpperCase() && route.methods.indexOf(method.toLowerCase())>-1){
	  		return true;
		}
  	}

  	return isSecure;
}

module.exports = authenticate;