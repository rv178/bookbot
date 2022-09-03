import {
	MessageActionRow,
	Modal,
	TextInputComponent,
} from "discord.js";
import { Command } from "../../structures/command";

export default new Command({
	name: "bugreport",
	description: "Report a bug.",
	run: async ({ interaction }) => {
		const modal = new Modal()
			.setCustomId("bugmodal")
			.setTitle("My Modal");
		const bugreportinput = new TextInputComponent()
			.setCustomId("bugreport")
			.setLabel("What is the bug?")
			.setStyle("PARAGRAPH");
		const firstActionRow: any = new MessageActionRow().addComponents(
			bugreportinput,
		);
		modal.addComponents(firstActionRow);
		await interaction.showModal(modal);
	},
});
