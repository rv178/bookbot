const Discord = require("discord.js");
const log = require("../../utils/logger");
const {
	bookDesc,
	getVolInfo,
	bookAuthor,
	bookImg,
	bookLang,
	bookLink,
	bookPub,
	bookTitle,
	bookPageCount,
} = require("../../utils/functions");
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
		const bookInfo = await getVolInfo(book);
		if (bookInfo.data.totalItems === 0) {
			return interaction.reply({ content: "No books found." });
		}

		const title = await bookTitle(bookInfo);
		const pageCount = await bookPageCount(bookInfo);
		const authors = await bookAuthor(bookInfo);
		const bookDescription = await bookDesc(bookInfo);
		// const categories = bookInfo.data.items[0].volumeInfo.categories.join(", ");
		const publishedDate = await bookPub(bookInfo);
		const lang = await bookLang(bookInfo);
		const previewLink = await bookLink(bookInfo);
		const thumbnail = await bookImg(bookInfo);

		log.warn(`Requested book: ${title}`);

		const bookEmbed = new Discord.MessageEmbed()
			.setTitle(title)
			.setDescription(bookDescription)
			.addField("Authors", authors)
			.addField("Published Date", publishedDate)
			.addField("Page Count", pageCount.toString())
			.addField("Language", lang)
			// .addField(
			// "Categories",
			// categories
			// )
			.addField("Preview Link", `[Click Here](${previewLink})`)
			.setColor("RANDOM")
			.setThumbnail(thumbnail);

		interaction.reply({ embeds: [bookEmbed] });
	},
};
