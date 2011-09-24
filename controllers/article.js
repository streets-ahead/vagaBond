var lazybum = require('lazybum'),
	Controller = lazybum.get('Controller');
	
var log = lazybum.getLogger(module);

var article = Controller.extend(function() {
	article.super_.apply(this, arguments);
});

article.prototype.collections = ['article']
article.prototype.helpers = ['html', 'markdown', 'blog']
module.exports = article;

article.prototype.index_get = function(urlParts, query) {
	if(urlParts && urlParts.length>0){
		if(urlParts.length==1){ urlParts.unshift("seoUrl"); }
		this.get_get(urlParts, query);
	}else{
		this.list_get(urlParts, query)
	}
  
};

article.prototype.index_post = function(urlParts, query, postData) {
  if(postData){
	if(postData._id){
		this.edit_post(urlParts, query, postData);
	}else{
		this.new_post(urlParts, query, postData);
	}
  }
};

article.prototype.get_get = function(urlParts, query){
	var that = this;
	var search = this.urlPathToMap(urlParts);
	console.log(search);
	this.article.find(search, function(res){
		var data = {}
		if(!res || res.length ==0){
			that.showNotFound();
		}else{
			data.article = res;
			if(res.length == 1){
				data.title = res.title
				data.innerTemplate = 'article/display'
			}else{
				data.title = 'vagaBond | Articles'
				data.innerTemplate = 'article/list'
			}
			that.writeResponse(data, 'index')
		}
	})
	
}

article.prototype.list_get = function(urlParts, query, postData){
	var that = this;
	this.article.findAll(function(results){
	    var data = {
	      article: results,
			title: 'vagaBond | Blog', 
			innerTemplate: 'article/list'
	    }
	    that.writeResponse(data, 'index')
	  });
}

article.prototype.new_get = function(urlParts, query){
	var data = {
		innerTemplate: 'article/edit_form',
		isNew: true,
		title: 'New Article | vagaBond'
	}
	
	this.writeResponse(data, 'index');
}

article.prototype.new_post = function(urlParts, query, postData){
	var that = this;
	  postData.tags = createArray(postData.tags);
	  postData.author = this.reqData.auth_status.user;
	  postData.publishDate = new Date();
	  var binding = this.bindInput(this.article, postData);
	  if(binding.valid){
	    binding.object.save(function(results, errors){
			if(results){
				that.redirect("/article/" + results[0].seoUrl)
			}else{
				var data = {
					article: postData,
					isNew: true,
					errors: errors,
					title: 'New Article | vagaBond',
					innerTemplate: 'article/edit_form'
				}
				that.writeResponse(data, 'index')
			}
			
	    });
	  }else{
	  	var data = {
	  		article: postData,
	  		isNew: true,
	  		errors: binding.object,
	  		title: 'New Article | vagaBond',
	  		innerTemplate: 'article/edit_form'
	  	}
	  	that.writeResponse(data, 'index')
	    // this.redirect("/article/edit");
	  }
}

article.prototype.edit_get = function(urlParts, query){
	var that = this;
	var criteria = this.urlPathToMap(urlParts);
	var data = {
		innerTemplate: 'article/edit_form',
		title: 'Edit Articlte | vagaBond'
	}
	this.article.find(criteria, function(results){
		if(results.length == 1){
			data.article = results[0]
			
			that.writeResponse(data, 'index')
		}else{
			console.log("OH NO")
		}
	});
}

article.prototype.edit_post = function(urlParts, query, postData){
	var that = this;
 	postData.tags = createArray(postData.tags);
	this.article.findOne({_id: postData._id}, function(result){
		for(attr in postData){
			if(attr && attr.length>0){
				log.trace('update ' + attr)
				result[attr] = postData[attr]
			}
		}
		result.save(function(results, errors){
			if(results){
				that.redirect('/article/' + result.seoUrl)
			}else{
				var data = {
					article: postData,
					isNew: false,
					errors: errors,
					title: 'Edit Article | vagaBond',
					innerTemplate: 'article/edit_form'
				}
				that.writeResponse(data,'index')
			}
		})
	});

}

var createArray = function(str){
  if(!str || str.length<1){
    return []
  }else{
    array = str.split(',');
    for(var i in array){
    	array[i] = array[i].trim();
    }
    return array
  }
}
