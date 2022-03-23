const Discord = require("discord.js");
const client = require("../index");
const { sendHook } = require("../utils/functions");
const log = require("../utils/logger");

client.on("guildCreate", async (guild) => {
	var guild_log;
	if (process.env.GUILDLOGS) {
		guild_log = process.env.GUILDLOGS;
	} else {
		log.error("guild logs webhook url not given!");
		process.exit();
	}

	await sendHook(
		guild_log,
		`Added to ${guild.name}`,
		`Guild ID: \`${guild.id}\` Guild Owner: \`${
			(
				await guild.fetchOwner()
			).user.tag
		}(${(await guild.fetchOwner()).user.id})\``,
		client.user.username,
		guild.iconURL({ dynamic: true })
	);
});
