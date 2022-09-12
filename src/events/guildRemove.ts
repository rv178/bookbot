import { client } from "../index";
import { MessageEmbed, WebhookClient } from "discord.js";
import { Event } from "../structures/event";

export default new Event("guildDelete", async (guild) => {
	const webhook = new WebhookClient({ url: process.env.GUILDLOGS });
	const embed = new MessageEmbed()
		.setAuthor({
			name: `Removed from ${guild.name}`,
			iconURL: guild.iconURL({ dynamic: true }),
		})
		.setColor("#ff0000")
		.setTimestamp()
		.setFooter({
			text: `Currently in ${client.guilds.cache.size} servers`,
			iconURL: client.user.avatarURL({ dynamic: true }),
		});
	webhook.send({
		avatarURL: client.user.avatarURL(),
		username: "Removed From Server",
		embeds: [embed],
	});
});
