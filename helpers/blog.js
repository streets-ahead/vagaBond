var text = require('lazyBum').getHelper('text'),
	html = require('lazyBum').getHelper('html');


exports.shortDisplay = function(body, maxLength, dest){
	var linkElips = html.createLink(dest, '...')
	var shortened =  text.limitCharacters(body, maxLength, linkElips)
	
	return (shortened.indexOf('&BREAK&')>-1) ? shortened.substr(0, shortened.indexOf('&BREAK&')) : shortened;
}