import { Event } from "../structures/event";
import { client } from "../index";
import { EmbedBuilder, WebhookClient } from "discord.js";

export default new Event("guildCreate", async (guild) => {
	const webhook = new WebhookClient({ url: process.env.GUILDLOGS });
	const embed = new EmbedBuilder()
		.setAuthor({
			name: `Added to ${guild.name}`,
			iconURL: guild.iconURL(),
		})
		.setColor("#ff0000")
		.setTimestamp()
		.setFooter({
			text: `Currently in ${client.guilds.cache.size} servers`,
			iconURL: client.user.avatarURL(),
		});
	webhook.send({
		avatarURL: client.user.avatarURL(),
		username: "Added To Server",
		embeds: [embed],
	});
});
