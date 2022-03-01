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
	run: async (client, interaction) => {
		const book = interaction.options.get("book").value;
		const bookInfo = await axios
			.get(`https://www.googleapis.com/books/v1/volumes?q=${book}`)
			.catch(function (error) {
				return interaction.followUp({
					content: `No books found. Error: ${error}`,
				});
			});

		if (bookInfo.data.totalItems === 0) {
			return interaction.followUp({ content: "No books found." });
		}

		const title = bookInfo.data.items[0].volumeInfo.title;
		const pageCount =
			bookInfo.data.items[0].volumeInfo.pageCount.toString();
		const authors = bookInfo.data.items[0].volumeInfo.authors.join(", ");
		const bookDescription = await bookDesc(book);
		// const categories = bookInfo.data.items[0].volumeInfo.categories.join(", ");
		const publishedDate = bookInfo.data.items[0].volumeInfo.publishedDate;
		const lang = bookInfo.data.items[0].volumeInfo.language;
		const previewLink = bookInfo.data.items[0].volumeInfo.previewLink;
		const thumbnail =
			bookInfo.data.items[0].volumeInfo.imageLinks.thumbnail;

		console.log(`Requested book: ${title}`);

		const bookEmbed = new Discord.MessageEmbed()
			.setTitle(title)
			.setDescription(bookDescription)
			.addField("Authors", authors)
			.addField("Published Date", publishedDate)
			.addField("Page Count", pageCount)
			.addField("Language", lang)
			// .addField(
			// "Categories",
			// categories
			// )
			.addField("Preview Link", `[Click Here](${previewLink})`)
			.setColor("RANDOM")
			.setThumbnail(thumbnail);

		interaction.followUp({ embeds: [bookEmbed] });
	},
};
