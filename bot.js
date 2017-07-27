// Our Twitter library
var Twit = require('./node_modules/twit');

// // // We need to include our configuration file
var T = new Twit(require('./config.js'));

 
document.getElementById('console').innerHTML = "Initializing.........\n\n";
 
// // // This function finds the latest tweet with the #mediaarts hashtag, and retweets it.
function retweetLatest(value) {
	document.getElementById('console').innerHTML = "Retweeting..... ";
	var mediaArtsSearch = {q: "#"+value, count: 1000, result_type: "recent"};
	T.get('search/tweets', mediaArtsSearch, function (error, data) {
	  // log out any errors and responses
	  // document.getElementById('console').innerHTML =+ "Error: "+error " Data: "+ data;
	  // If our search request to the server had no errors...
	  if (!error) {
		for (var i = 0; i < data.statuses.length; i++) {
			var retweetId = data.statuses[i].id_str;
			T.post('statuses/retweet/' + retweetId, { }, function (error, response) {
				if (response) {
					document.getElementById('console').innerHTML = 'Success! Check your bot, it should have retweeted something.';
				}
				// If there was an error with our Twitter call, we print it out here.
				if (error) {
					document.getElementById('console').innerHTML = 'There was an error with Twitter:'+ error;
				}
			})
		};
		
	  }
	  // However, if our original search request had an error, we want to print it out here.
	  else {
	  	document.getElementById('console').innerHTML = 'There was an error with your hashtag search:'+ error;
	  }
	});

}
// // ...and then every hour after that. Time here is in milliseconds, so
// // 1000 ms = 1 second, 1 sec * 60 = 1 min, 1 min * 60 = 1 hour --> 1000 * 60 * 60
// setInterval(retweetLatest, 3600);


//BOT TO TWEET OTHER CRAP
function respondtwitter(value){
    document.getElementById('console').innerHTML = "Searching..... ";
	T.get('search/tweets', { q: value +' since:2016-11-11', count: 200 }, function(err, data, response) {
	  document.getElementById('console').innerHTML = JSON.stringify(data);
	})
}

function tweeter(value){
	  document.getElementById('console').innerHTML = "Tweeting..... ";
      T.post('statuses/update', { status: value }, function(err, data, response) {
        document.getElementById('console').innerHTML = "You just Tweeted "+value+"\n Response Info: "+JSON.stringify(data);
      })
    }