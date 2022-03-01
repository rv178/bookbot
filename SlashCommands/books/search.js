const Discord = require("discord.js");
const axios = require("axios");
const { bookDesc } = require("../../utils/functions");
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
		if (bookInfo.data.totalItems === 0) {
			return interaction.followUp({ content: "No books found." });
		}
		console.log(bookInfo.data.items[0].volumeInfo);
		// console log the page count of the book as a string
		const pageCount =
			bookInfo.data.items[0].volumeInfo.pageCount.toString();
		const authors = bookInfo.data.items[0].volumeInfo.authors.join(", ");
		const bookDescription = await bookDesc(book);
		const bookEmbed = new Discord.MessageEmbed()
			.setTitle(bookInfo.data.items[0].volumeInfo.title)
			.setDescription(bookDescription)
			.addField("Authors", authors)
			.addField(
				"Published Date",
				bookInfo.data.items[0].volumeInfo.publishedDate
			)
			.addField("Page Count", pageCount)
			.addField("Language", bookInfo.data.items[0].volumeInfo.language)
			.addField(
				"Categories",
				bookInfo.data.items[0].volumeInfo.categories.join(", ")
			)
			.addField(
				"Preview Link",
				`[Click Here](${bookInfo.data.items[0].volumeInfo.previewLink})`
			)
			.setColor("RANDOM")
			.setThumbnail(
				bookInfo.data.items[0].volumeInfo.imageLinks.thumbnail
			);

		interaction.followUp({ embeds: [bookEmbed] });
	},
};
