const Discord = require("discord.js");
const axios = require("axios");
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
		const queryInfo = await axios
			.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
			.catch(function (error) {
				return interaction.followUp({
					content: `No results found. Error: ${error}`,
				});
			});

		if (queryInfo.data.totalItems === 0) {
			return interaction.followUp({ content: "No results found." });
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
		interaction.followUp({ embeds: [listEmbed] });
	},
};
