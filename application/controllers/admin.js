var lazybum = require('lazybum'),
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
        themeOptions: options
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
