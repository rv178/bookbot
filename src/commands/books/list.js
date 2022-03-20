const Discord = require("discord.js");
const { getVolInfo } = require("../../utils/functions");
module.exports = {
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
	run: async (client, interaction) => {
		const query = interaction.options.get("query").value;
		const queryInfo = await getVolInfo(query);
		if (queryInfo.data.totalItems === 0) {
			return interaction.reply({ content: "No results found." });
		}

		const arr = [];
		for (let i = 0; i < 5; i++) {
			arr.push(`${queryInfo.data.items[i].volumeInfo.title}`);
		}
		const listEmbed = new Discord.MessageEmbed()
			.setTitle(`Results for query "${query}".`)
			.addField("#1", arr[0])
			.addField("#2", arr[1])
			.addField("#3", arr[2])
			.addField("#4", arr[3])
			.addField("#5", arr[4])
			.setTimestamp()
			.setColor("BLUE");
		interaction.reply({ embeds: [listEmbed] });
	},
};
