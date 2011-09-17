var lazyBum = require('lazyBum'),
    crypto = require('crypto'),
    base64 = require('base64')

var authenticate = {
  collections: ['author'],
  helpers: ['config'],

  run: function(){
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
                presentAuthChallenge(that.reqData)
              }
          })

          return;

        }
      }

      if(!auth){
        presentAuthChallenge(this.reqData)
        return;
      }
    }
    
    this.hookComplete();
  }
}

var presentAuthChallenge = function(reqData) {
  reqData.response.writeHead(401, "Authorization Required", {"WWW-Authenticate" : 'Basic realm="Secure Area"', "Content-Type":"text/html"});
  reqData.response.write('<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"' +
     '"http://www.w3.org/TR/1999/REC-html401-19991224/loose.dtd">' +
    '<HTML>' +
      '<HEAD>' +
        '<TITLE>Error</TITLE>' +
        '<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=ISO-8859-1">' +
      '</HEAD>' +
      '<BODY><H1>401 Unauthorized.</H1></BODY>' +
    '</HTML>'
  );
  reqData.response.end();
};

var isSecure = function(url, method, secureRoutes){
  var isSecure = false;

  for(var i in secureRoutes){
    var route = secureRoutes[i]
    if(route.route.toUpperCase() === url.toUpperCase() && route.methods.indexOf(method.toLowerCase())>-1){
      return true;
    }
  }

  return isSecure;
}

module.exports = authenticate;