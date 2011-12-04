var lazyBum = require('lazyBum'),
	Renderer = lazyBum.getLocal('Renderer', true),
	FeedBum = require('../FeedBum/FeedBum'),
	lbConfig = require('lbConfig');

var atom = Renderer.extend(function() {
	atom.super_.apply(this, arguments);
});

module.exports = atom;

atom.prototype.render = function(obj) {
	feed = new FeedBum(FeedBum.ATOM);
	feed.setTitle("Streets Ahead");
	feed.setLink(lbConfig.getConfig().baseURL);
	feed.setChannelElement('author', {'name' : 'Streets Ahead LLC.', 'email':'team@streetsaheadllc.com'});
	//feed.setDate('updated', obj.posts[0].date);

	for(var i = 0; i < obj.posts.length; i++ ) {
		newItem = feed.createNewItem();
		//Add elements to the feed item
		//Use wrapper functions to add common feed elements
		newItem.setTitle(obj.posts[i].title);
		newItem.setLink(lbConfig.getConfig().baseURL + 'article/' + obj.posts[i].page_url);
		newItem.setDate(obj.posts[i].date);
		//Internally changed to "summary" tag for ATOM feed
		newItem.setDescription(obj.posts[i].body);
		//Now add the feed item	
		feed.addItem(newItem);
	}

	this.endResponse(feed.generateFeed());
}; 

atom.CONTENT_TYPE = "application/atom+xml";