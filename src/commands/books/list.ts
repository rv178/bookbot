import { getVolInfo } from "../../utils/functions";
import { MessageEmbed } from "discord.js";
import { Command } from "../../structures/command";

export default new Command({
	name: "list",
	description: "Lists results for a given query.",
	options: [
		{
			name: "query",
			type: "STRING",
			description: "Provide a query to search.",
			required: true,
		},
	],
	run: async ({ interaction }) => {
		const query = interaction.options.get("query").value;
		const queryInfo = await getVolInfo(query.toString());
		if (queryInfo.data.totalItems === 0) {
			return interaction.reply({ content: "No results found." });
		}

		const arr = [];
		for (let i = 0; i < 5; i++) {
			arr.push(`[${queryInfo.data.items[i].volumeInfo.title} - ${queryInfo.data.items[i].volumeInfo.authors[0]}](${queryInfo.data.items[i].volumeInfo.infoLink})`);
		}
		const listEmbed = new MessageEmbed()
			.setTitle(`Results for query "${query}".`)
			.addFields(
				{ name: "#1", value: arr[0] },
				{ name: "#2", value: arr[1] },
				{ name: "#3", value: arr[2] },
				{ name: "#4", value: arr[3] },
				{ name: "#5", value: arr[4] }
			)
				
			.setTimestamp()
			.setAuthor({ name: "BookBot", iconURL: "https://cdn.discordapp.com/emojis/948892682032394240.webp?size=96&quality=lossless" })
			.setColor("BLUE");
		interaction.reply({ embeds: [listEmbed] });
	},
});
