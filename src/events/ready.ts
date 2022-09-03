import { Event } from "../structures/event";
import { client } from "../index";
import log from "../utils/logger";

export default new Event("ready", () => {
	log.warn(`Logged in as ${client.user.tag}.`);
	setInterval(async () => {
		let textList = [
			"books being re-organized",
			`${client.guilds.cache.size} servers!`,
			"a stack of books falling",
		];
		var text = textList[Math.floor(Math.random() * textList.length)];
		client.user.setActivity({
			name: text,
			type: "WATCHING",
		});
	}, 30000); // milliseconds
});
