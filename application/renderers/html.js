var lazyBum = require('lazyBum'),
    html = lazyBum.getRenderer('html', true);

var vbTheme = html.extend(function(){
  vbTheme.super_.apply(this, arguments);
});

module.exports = vbTheme

vbTheme.prototype.collections = ['admin']
vbTheme.prototype.helpers = ['config']

var lbHtml = html.prototype.render
vbTheme.prototype.render = function(data, sandbox, templateName){
  var self = this;
  self.admin.findOne({}, function(admin){
    if(admin){
      	self.config.getConfig().templateDir = '/../themes/' + admin.theme;
      	lbHtml(data, sandbox, templateName,self);
    } else {
		self.config.getConfig().templateDir = '/../themes/vagaBond';
     	lbHtml(data, sandbox, templateName,self);
	}
  });
}
