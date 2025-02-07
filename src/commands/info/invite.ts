import { EmbedBuilder } from "discord.js";
import { Command } from "../../structures/command";

export default new Command({
	name: "invite",
	description: "Invite me to your server!",
	run: async ({ client, interaction }) => {
		const embed = new EmbedBuilder()
			.setAuthor({
				name: "Invite me to your server!",
				iconURL: client.user.avatarURL(),
			})
			.setDescription(
				`[Invite me!](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=2147862592&scope=bot%20applications.commands )`,
			)
			.setColor("Blue");
		interaction.reply({ embeds: [embed] });
	},
});
