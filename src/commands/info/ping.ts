import { Command } from "../../structures/command";

export default new Command({
	name: "ping",
	description: "Returns websocket ping.",
	run: async ({ client, interaction }) => {
		interaction.reply({ content: `${client.ws.ping} ms!` });
	},
});
