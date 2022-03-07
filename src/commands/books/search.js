const Discord = require("discord.js");
const { bookDesc, getVolInfo, bookAuthor, bookImg, bookLang, bookLink, bookPub, bookTitle, bookPageCount } = require("../../utils/functions");
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
			return interaction.followUp({ content: "No books found." });
		}

		const title = await bookTitle(book);
		const pageCount = await bookPageCount(book);
		const authors = await bookAuthor(book);
		const bookDescription = await bookDesc(book);
		// const categories = bookInfo.data.items[0].volumeInfo.categories.join(", ");
		const publishedDate = await bookPub(book);
		const lang = await bookLang(book);
		const previewLink = await bookLink(book);
		const thumbnail = await bookImg(book);

		console.log(`[?] Requested book: ${title}`);

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
