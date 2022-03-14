const Discord = require("discord.js");
const Schema = require("../../models/profile.js");
const { getVolInfo, bookImg, bookAuthor } = require("../../utils/functions.js");

module.exports = {
	name: "read",
	description: "List the books you have read.",
	options: [
		{
			name: "book",
			type: "STRING",
			description: "The name of the book you read",
			required: true,
		},
	],
	run: async (client, interaction, args) => {
		const book = interaction.options.get("book").value;
		const data = await Schema.findOne({ User: interaction.user.id });
		if (!data) {
			const firstembed = new Discord.MessageEmbed()
				.setAuthor({
					name: `Please pick a genre from /set-genre to start!`,
					iconURL: interaction.user.avatarURL({ dynamic: true }),
				})
				.setColor("BLUE");
			interaction.followUp({ embeds: [firstembed] });
		}
		if (data) {
			if (data.Read.includes(book)) {
				const read = new Discord.MessageEmbed()
					.setTitle("You have already read this book.")
					.setColor("BLUE");
				interaction.followUp({ embeds: [read] });
			} else {
				const bookInfo = await getVolInfo(book);
				const embed = new Discord.MessageEmbed()
					.setAuthor({
						name: `You have read ${book}`,
						iconURL: interaction.user.avatarURL({ dynamic: true }),
					})
					.setFooter({
						text: `Author: ` + (await bookAuthor(bookInfo)),
					})
					.setThumbnail(await bookImg(bookInfo))
					.setColor("BLUE");
				interaction.followUp({ embeds: [embed] });
				data.Read.push(book.toLowerCase());
				data.save();
			}
		}
	},
};
