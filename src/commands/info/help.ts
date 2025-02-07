import {
	ActionRowBuilder,
	ButtonBuilder,
	EmbedBuilder,
} from "discord.js";
import { readdirSync } from "fs";
import { Command } from "../../structures/command";
import { CommandType } from "../../typings/command";

export default new Command({
	name: "help",
	description: "Show the help menu.",
	run: async ({ client, interaction }) => {
		// defer reply
		await interaction.deferReply();
		const categories: any[] = [];

		readdirSync("./dist/commands").forEach(async (dir) => {

			const getCmds = async (): Promise<string[]> => {
				const cmds = await Promise.all(commands.map(async (command: string) => {
					const file: CommandType = await client.importFile(`${__dirname}/../${dir}/${command}`);
					if (!file.name) return "No command name.";
					var info_str = `\`${file.name}\` : ${file.description} \n`;
					return info_str;
				}));
				return cmds;
			};

			const commands = readdirSync(`./dist/commands/${dir}/`).filter(
				(file) => file.endsWith(".js")
			);

			const returnData = async (): Promise<object> => {
				const cmds = await getCmds();

				const data = {
					name: dir.toUpperCase(),
					value: cmds.length === 0 ? "In progress." : cmds.join(" "),
				};
				return data;
			}

			const data = await returnData();

			categories.push(data);

		});

		// I have no idea why, but this does not work without setInterval
		setInterval(() => {
			const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
				new ButtonBuilder()
					.setLabel("Support Server")
					.setStyle(5) // 5 is button type 'link' (https://discord-api-types.dev/api/discord-api-types-v10/enum/ButtonStyle#Link)
					.setURL("https://discord.gg/Kk4tSmQXUb")
					.setEmoji("<:BookBot:948892682032394240>"),
				new ButtonBuilder()
					.setLabel("Invite")
					.setStyle(5)
					.setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=2147862592&scope=bot%20applications.commands`)
					.setEmoji("<:BookBot:948892682032394240>"),

				new ButtonBuilder()
					.setLabel("GitHub")
					.setStyle(5)
					.setURL("https://github.com/rv178/BookBot")
					.setEmoji("<:BookBot:948892682032394240>"),
			);
			const embed = new EmbedBuilder()
				.setTitle("Here are all of my commands:")
				.addFields(categories)
				.setDescription("Use `/help`.")
				.setTimestamp()
				.setColor("Blue");

			return interaction.editReply({ embeds: [embed], components: [row] });
		}, 1);
	},
});
