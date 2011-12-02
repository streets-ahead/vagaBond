var lazybum = require('lazyBum'),
	Controller = lazybum.get('Controller'),
  fs = require('fs');
	
var log = lazybum.getLogger(module);

var admin = Controller.extend(function() {
	admin.super_.apply(this, arguments);
});

module.exports = admin;

admin.prototype.collections = ['article', 'page', 'author','admin']

admin.prototype.index_get = function(urlParts, query) {
  var self = this;
  self.admin.findOne({}, function(admin){
    if(admin){
      var options = fs.readdirSync(process.cwd() + '/../themes' )
      var data = {
        admin: admin,
        themeOptions: options,
        article: self.article
      }
      self.writeResponse(data, 'admin/settings')
    }
   });
};

admin.prototype.index_post = function(urlParts, query, postData) {
  var self = this;
  self.admin.findOne({}, function(admin){
    for(attr in postData){
      admin[attr] = postData[attr]
    }
    admin.save(function(results, errors){
      if(results){
        self.redirect('/admin')
      }else{
        var data = {
          admin: admin,
          errors: errors,
          themeOptions: fs.readdirSync(process.cwd() + '/../themes')
        }
        self.writeResponse(data, 'admin/settings')
      }
    });
  });
};

admin.prototype.articles_get = function(urlParts, query) {
  var self = this;
  self.article.findAll(function(results){
    var data = {
      articles: results
    }
    self.writeResponse(data, 'admin/articles');
  });
}

admin.prototype.pages_get = function(urlParts, query) {
  var self = this;
  self.page.findAll(function(results){
    var data = {
      pages: results
    }
    self.writeResponse(data, 'admin/pages');
  });
}

admin.prototype.authors_get = function(urlParts, query) {
  var self = this;
  self.author.findAll(function(results){
    var data = {
      authors: results
    }
    self.writeResponse(data, 'admin/authors');
  });
}

