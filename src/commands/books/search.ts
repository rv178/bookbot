import { MessageEmbed } from "discord.js";
import {
	bookAuthor,
	bookDesc,
	bookImg,
	bookLang,
	bookLink,
	bookPageCount,
	bookPub,
	bookTitle,
	getVolInfo,
} from "../../utils/functions";
import { Command } from "../../structures/command";

export default new Command({
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
	run: async ({ interaction }) => {
		const book = interaction.options.get("book").value;
		const bookInfo = await getVolInfo(book.toString());
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

		const bookEmbed = new MessageEmbed()
			.setTitle(title)
			.setDescription(bookDescription)
			.addFields(
				{ name: "Authors", value: authors },
				{ name: "Published Date", value: publishedDate },
				{ name: "Page Count", value: pageCount.toString() },
				{ name: "Language", value: lang },
				{ name: "Preview Link", value: `[Click Here](${previewLink})` }

			)
			.setColor("BLUE")
			.setThumbnail(thumbnail);

		interaction.reply({ embeds: [bookEmbed] });
	},
});
