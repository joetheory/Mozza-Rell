var Discordie = require("discordie");
var Discord = new Discordie();

var Config = require("./config.json");
var token = Config.token;
Discord.connect({ token: token });

var Twit = require('twit')

var T = new Twit({
  consumer_key:         'cyC7rxylZPlXNwSj7EHt7MZUW',
  consumer_secret:      Config.twitSecret,
  access_token:         '486675175-tSMCerO8D0yDLuocZX1JXkmEqrlDY6iHJcCnV0Oe',
  access_token_secret:  Config.twitTokenSecret,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})




var stream = T.stream('statuses/filter', { follow: '486675175,14119066,809487942' });

stream.on('tweet', function (tweet) {
	if(tweet.retweeted === false) {
		console.log(tweet);
		var guild = Discord.Guilds.find(g => g.name == "DevTayne");
		channel = guild.textChannels.find(c => c.name == "general");
		channel.sendMessage('@' + tweet.user.screen_name + ' tweeted: ' + tweet.text );
	} 
	console.log(tweet);
})

Discord.Dispatcher.on("GATEWAY_READY", e => {
	Discord.User.setUsername('Mozza-Rell');
	console.log("New Event: GATEWAY_READY");
	console.log("Hey, I'm " + Discord.User.username + ", your latest dancer. I can't wait to entertain you.");
	
});

Discord.Dispatcher.on("MESSAGE_CREATE", e => {
	console.log("New Event: MESSAGE_CREATE");
	console.log(">(" + e.message.timestamp + ") " + e.message.author.username + ": " + e.message.content);

	var incoming_text = e.message.content;

	// !killyourself
	// Go back in time and kill yourself
	if(incoming_text == "!killyourself") { // Go back in time
		sendMessage(e, "Going back in time, brb.");
		client.disconnect();
		return;
	}
});

function sendMessage(obj, text) {
	obj.message.channel.sendMessage(text);
}

String.prototype.startsWith = function(prefix) {
    return this.indexOf(prefix) === 0;
}