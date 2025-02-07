import { client } from "../index";
import { EmbedBuilder, WebhookClient } from "discord.js";
import { Event } from "../structures/event";

export default new Event("interactionCreate", (interaction) => {
	if (!interaction.isModalSubmit()) return;
	if (interaction.customId === "bugmodal") {
		interaction.reply({ content: "Thank you for your report!" });
	}
	const bugreport = interaction.fields.getTextInputValue("bugreport");
	const embed = new EmbedBuilder()
		.setTitle("Bug Report")
		.setDescription("```" + bugreport + "```")
		.setColor("#0099ff")
		.setFooter({
			text: interaction.user.tag + " | " + interaction.user.id,
			iconURL: interaction.user.avatarURL(),
		});

	const send = new WebhookClient({ url: process.env.REPORTLOG });
	send.send({
		embeds: [embed],
		username: "Bug Report",
		avatarURL: client.user.avatarURL(),
	});
});
