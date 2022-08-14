const client = require("../../index");
const log = require("../utils/logger");

client.on("ready", () => {
	log.warn(`Logged in as ${client.user.tag}.`);
	client.user.setActivity("people read books!", { type: "WATCHING" });
});
