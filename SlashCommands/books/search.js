const Discord = require("discord.js");
const axios = require("axios");
module.exports = {
	name: "search",
	description: "Searches for a given book.",
	options: [
		{
			name: "book",
			type: "STRING",
			description: "Provide a book.",
			required: true,
		},
	],
	run: async (client, interaction, args) => {
		const book = interaction.options.get("book").value;
		const bookInfo = await axios
			.get(`https://www.googleapis.com/books/v1/volumes?q=${book}`)
			.catch(function (error) {
				if (error.response) {
					return interaction.followUp({ content: "No books found." });
				} else if (error.request) {
					return interaction.followUp({ content: "No books found." });
				} else {
					return interaction.followUp({ content: "No books found." });
				}
				return interaction.followUp({ content: "No books found." });
			});
		console.log(bookInfo.data.totalItems);
		if (bookInfo.data.totalItems === 0) {
			return interaction.followUp({ content: "No books found." });
		}
		let bookDescription = "";
		if (bookInfo.data.items[0].volumeInfo.description === undefined) {
			bookDescription = "No description available.";
		} else {
			bookDescription = bookInfo.data.items[0].volumeInfo.description;
		}
		const bookEmbed = new Discord.MessageEmbed()
			.setTitle(bookInfo.data.items[0].volumeInfo.title)
			.setDescription(bookDescription)
			.setColor("RANDOM")
			.setThumbnail(
				bookInfo.data.items[0].volumeInfo.imageLinks.thumbnail
			);

		interaction.followUp({ embeds: [bookEmbed] });
	},
};
