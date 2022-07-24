const Discord = require("discord.js");
const Schema = require("../../models/profile.js");
const axios = require("axios");
const {
	getVolInfo,
	bookTitle,
	bookImg,
	bookAuthor,
	bookDesc,
	bookLink,
} = require("../../utils/functions");
module.exports = {
	name: "recommend",
	description: "Get a book recommendation.",
	options: [
		{
			type: "STRING",
			name: "genre",
			description: "The book genre you want to get a recommendation for.",
		},
	],
	run: async (client, interaction, args) => {
		const data = await Schema.findOne({ User: interaction.user.id });
		if (!args[0] && data === undefined) {
			const embed = new Discord.MessageEmbed()
				.setAuthor({
					name: `Please pick a genre from /set-genre or provide a genre`,
					iconURL: interaction.user.avatarURL({ dynamic: true }),
				})
				.setColor("BLUE");
			return interaction.reply({ embeds: [embed] });
		}
		if (args[0] || data.Genre) {
			const genre = args[0] || data.Genre;
			const book = await axios.get(
				`https://www.googleapis.com/books/v1/volumes?q=subject:${genre}`
			);
			const bookinfo = await getVolInfo(
				book.data.items[
					Math.floor(Math.random() * book.data.items.length)
				].id
			);
			const embed = new Discord.MessageEmbed()
				.setAuthor({
					name: `Recommended book for ${genre}`,
					iconURL: interaction.user.avatarURL({ dynamic: true }),
				})
				.setColor("BLUE")
				.setTitle(await bookTitle(bookinfo))
				.setDescription(await bookDesc(bookinfo))
				.setThumbnail(await bookImg(bookinfo));

			// create a button using discord.js message components
			const row = new Discord.MessageActionRow().addComponents(
				new Discord.MessageButton()
					.setLabel("Book Preview")
					.setStyle("LINK")
					.setURL(await bookLink(bookinfo))
					.setEmoji("<:BookBot:948892682032394240>")
			);
			interaction.reply({ embeds: [embed], components: [row] });
		}
	},
};
