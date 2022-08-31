const Discord = require("discord.js");
const { MessageActionRow, Modal, TextInputComponent } = require('discord.js');

module.exports = {
	name: "bugreport",
	description: "Report a bug.",
	run: async (client, interaction) => {
		const modal = new Modal()
			.setCustomId('bugmodal')
			.setTitle('My Modal');
		const bugreportinput = new TextInputComponent()
			.setCustomId('bugreport')
			.setLabel("What is the bug?")
			.setStyle('PARAGRAPH');
		const firstActionRow = new MessageActionRow().addComponents(bugreportinput);
		modal.addComponents(firstActionRow);
		await interaction.showModal(modal);
	},
};
