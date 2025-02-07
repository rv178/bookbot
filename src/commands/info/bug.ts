import {
	ActionRowBuilder,
	ModalBuilder,
	TextInputBuilder,
} from "discord.js";
import { Command } from "../../structures/command";

export default new Command({
	name: "bugreport",
	description: "Report a bug.",
	run: async ({ interaction }) => {
		const modal = new ModalBuilder()
			.setCustomId("bugmodal")
			.setTitle("Bug report");
		const bugreportinput = new TextInputBuilder()
			.setCustomId("bugreport")
			.setLabel("What is the bug?")
			.setStyle(2);
		const firstActionRow: any = new ActionRowBuilder().addComponents(
			bugreportinput,
		);
		modal.addComponents(firstActionRow);
		await interaction.showModal(modal);
	},
});
