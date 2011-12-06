var email = require('mailer'),
	lazyBum = require('lazyBum'),
	mongo = lazyBum.getHelper('mongo'),
	config = lazyBum.getHelper('config');

var db = config.getConfig().databaseName;
var dbServer = config.getConfig().databaseServer;
var dbClient = mongo.createDbClient(db, dbServer);
dbClient.connect();


var mockingbird = {
	runTime: 14,  //run @ 7AM each day -- our server is seven hours ahead.
	run: function(){
		var now = new Date()

		if(this.runTime == now.getHours()){

			var today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
			var tomorrow = today
			tomorrow.setDate(today + 1);

			dbClient.find("article", {publisDate: {$gte: today, $lt: tomorrow}}, {}).next( function(done, result, err) {
				if(err) {
					log.error(err.stack);
				}
				if(result && result.length < 1){
					email.send({
						host: "smtp.gmail.com",
						port: "465",
						ssl: true,
						domain: "sts-ahead.com",
						to: "team@sts-ahead.com",
						from: "mb@sts-ahead.com",
						subject: "MockingBird: Write A Blog Post (" + (new Date()).toDateString() +" )",
						body: "There is no blog post scheduled to be published today.\nYou should get on that ... much like one would \"get on\" Sam's Mom",
						authentication: "login",
						username: "mb@sts-ahead.com",//"bWJAc3RzLWFoZWFkLmNvbQ==",
						password: "TigerDreams"//"VGlnZXJEcmVhbXM="
					},function(err, result){
						console.log(result)
						console.log(err)
					});
				}
			});
		}
	}
}

module.exports = mockingbird;