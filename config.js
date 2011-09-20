module.exports = {
	"baseURL" : "http://localhost",
	"port" : 8888,
	"defaultRenderer" : "html",
	"defaultController" : "page",
	"routeMaps" : [
		{
		 	"path" : "/",
		 	"dest" : "/article"
	 	}
	],
	"routeHandlers" : [
		
	],
	"MIME_TYPES" : {
		"eot" : "application/vnd.ms-fontobject",
		"ttf" : "font/ttf",
		"otf" : "font/otf",
		"ico" : "image/x-icon",
		"css" : "text/css",
		"js"  : "application/x-javascript",
		"xml" : "application/xml"
	},
	"preControllerHooks" : [
		"authenticate"
	],
	"postControllerHooks" : [
	],
	"secureRoutes":[
		{
			"route" : "/article/new",
			"methods" : ['get','post'] //NOTE: for now always make lowercase.
		},
		{
			"route" : "/article/edit",
			"methods" : ['get', 'post']
		},
		{
			"route" : "/page/new",
			"methods" : ['get', 'post']
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
	"mobileEnabled" : false
};
