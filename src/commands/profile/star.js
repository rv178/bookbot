const Discord = require("discord.js");
const Schema = require("../../models/profile.js");
const { getVolInfo, bookImg, bookAuthor } = require("../../utils/functions.js");

module.exports = {
	name: "star",
	description: "Add a book to your favourites list.",
	options: [
		{
			name: "book",
			type: "STRING",
			description: "Name of book",
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
			if (data.Starred.includes(book)) {
				const star = new Discord.MessageEmbed()
					.setTitle("You have already starred this book.")
					.setColor("BLUE");
				interaction.followUp({ embeds: [star] });
			} else {
				const bookInfo = await getVolInfo(book);
				const embed = new Discord.MessageEmbed()
					.setAuthor({
						name: `You have starred "${book}"`,
						iconURL: interaction.user.avatarURL({ dynamic: true }),
					})
					.setFooter({
						text: `Author: ` + (await bookAuthor(bookInfo)),
					})
					.setThumbnail(await bookImg(bookInfo))
					.setColor("BLUE");
				interaction.followUp({ embeds: [embed] });
				data.Starred.push(book.toLowerCase());
				data.save();
			}
		}
	},
};
