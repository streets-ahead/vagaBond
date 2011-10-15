module.exports = {
	'adminPassword': 'admin', 
	
	"baseURL" : "http://localhost",
	"port" : 8888,
	"defaultRenderer" : "html",
	"defaultController" : "page",
	"routeMaps" : [
    {
      "path" : "/users/(.+)",
      "dest" : "/author/login"
    }
	],
	"preControllerHooks" : [
      "authenticate"
	],
	"postControllerHooks" : [
	],
	"secureRoutes":[
		{
			"route" : "/(article|page|author)/(new|edit)",
			"methods" : '*'
		}
	],
	"databaseName" : "vagaBond",
	"logAppenders" : [
		{
			"file" : "lb.log",
			"level" : "error"
		},
		{
			"file" : "access.log",
			"level" : "access"	
		},
		{
			"file" : "console",
			"level" : "trace"
		}
	],
	"templateCache" : 3600, // in seconds
	"templateTags" : {
		"start" : "<%",
		"end" : "%>"
	},
  "templateDir" : "/../themes/default",
	"disqus" : "tkeeney",
	"mobileEnabled" : false
};
