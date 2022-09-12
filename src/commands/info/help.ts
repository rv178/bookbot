import {
	MessageActionRow,
	MessageButton,
	MessageEmbed,
} from "discord.js";
import { Command } from "../../structures/command";
import { readdir } from "fs";
import { CommandType } from "typings/command";

export default new Command({
	name: "help",
	description: "Show the help menu.",
	run: async ({ interaction }) => {
		const categories: any[] = [];

		readdir("./src/commands", (err, files) => {
			if (err) throw err;
			files.forEach((dir: any) => {
				readdir(`./src/commands/${dir}/`, (err, files) => {
					if (err) throw err;
					const cmds = files.map((file: any) => {
						const command: CommandType = require(`../${dir}/${file}`);
						if (!command.name) return "No command name.";
						const name = command.name.replace(".ts", "");
						const description = command.description;

						return `\`${name}\` : ${description} \n`;
					});
					let data = new Object();

					data = {
						name: dir,
						value: cmds.length === 0 ? "In progress." : cmds.join(" "),
					};

					categories.push(data);
				});
			});
		});


		const row = new MessageActionRow().addComponents(
			new MessageButton()
				.setLabel("Support Server")
				.setStyle("LINK")
				.setURL("https://discord.gg/Kk4tSmQXUb")
				.setEmoji("<:BookBot:948892682032394240>"),
		);
		const embed = new MessageEmbed()
			.setTitle("Here are all of my commands:")
			.addFields(categories)
			.setDescription("Use `/help`.")
			.setTimestamp()
			.setColor("BLUE");

		return interaction.reply({ embeds: [embed], components: [row] });
	},
});
