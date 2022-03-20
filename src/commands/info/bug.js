const Discord = require("discord.js");
const { Modal, TextInputComponent, showModal } = require("discord-modals");

module.exports = {
	name: "bugreport",
	description: "Report a bug",
	run: async (client, interaction, args) => {
		const modal = new Modal()
			.setCustomId("bugreport")
			.setTitle("Bookbot bug/feature report")
			.addComponents([
				new TextInputComponent()
					.setCustomId("bugreport-txt")
					.setLabel("What is the bug?")
					.setStyle("SHORT")
					.setMinLength(4)
					.setMaxLength(100)
					.setPlaceholder("Write text here")
					.setRequired(true),
			]);
		showModal(modal, {
			client: client, // Client to show the Modal through the Discord API.
			interaction: interaction, // Show the modal with interaction data.
		});
	},
};
