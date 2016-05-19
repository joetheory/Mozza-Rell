var Discordie = require("discordie");
var client = new Discordie();

var Config = require("./config.json");
var token = Config.token;
client.connect({ token: token });

client.Dispatcher.on("GATEWAY_READY", e => {
	console.log("New Event: GATEWAY_READY");
	console.log("Hey, I'm " + client.User.username + ", your latest dancer. I can't wait to entertain you.");
});

client.Dispatcher.on("MESSAGE_CREATE", e => {
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