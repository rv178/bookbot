const client = require("../../index");
const log = require("../utils/logger");

client.on("ready", () => {
	log.warn(`Logged in as ${client.user.tag}.`);
	setInterval(async () => {
		let textList = ['books being re-organized', `${client.guilds.cache.size} servers!`, 'a stack of books falling']
		var text = textList[Math.floor(Math.random() * textList.length)];
		client.user.setActivity({
			name: text,
			type: "WATCHING"
		})
	}, 30000) // milliseconds
});
