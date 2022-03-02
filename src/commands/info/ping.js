const { Client, CommandInteraction } = require("discord.js");

module.exports = {
	name: "ping",
	description: "Returns websocket ping.",
	/**
	 *
	 * @param {Client} client
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
	run: async (client, interaction) => {
		interaction.followUp({ content: `${client.ws.ping} ms!` });
	},
};
