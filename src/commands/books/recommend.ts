import {
	ActionRowBuilder,
	ButtonBuilder,
	EmbedBuilder,
} from "discord.js";
import axios from "axios";
import {
	bookDesc,
	bookImg,
	bookLink,
	bookTitle,
	getVolInfo,
} from "../../utils/functions";
import { Command } from "../../structures/command";
import Schema from "../../models/profile";

export default new Command({
	name: "recommend",
	description: "Get a book recommendation.",
	options: [
		{
			type: 3,
			name: "genre",
			description: "The book genre you want to get a recommendation for.",
		},
	],
	run: async ({ interaction, args }) => {
		const data = await Schema.findOne({ User: interaction.user.id });
		if (args.get("genre") === null && data === undefined) {
			const embed = new EmbedBuilder()
				.setAuthor({
					name: "Please pick a genre from /set-genre or provide a genre",
					iconURL: interaction.user.avatarURL(),
				})
				.setColor("Blue");
			return interaction.reply({ embeds: [embed] });
		}
		if (args.get("genre") != null || data.Genre) {
			const genre = (args.get("genre") != null) ? args.get("genre").value : data.Genre.toString();
			const book = await axios.get(
				`https://www.googleapis.com/books/v1/volumes?q=subject:${genre}`,
			);
			const bookinfo = await getVolInfo(
				book.data.items[
					Math.floor(Math.random() * book.data.items.length)
				].id,
			);
			const embed = new EmbedBuilder()
				.setAuthor({
					name: `Recommended book for ${genre}`,
					iconURL: interaction.user.avatarURL(),
				})
				.setColor("Blue")
				.setTitle(await bookTitle(bookinfo))
				.setDescription(await bookDesc(bookinfo))
				.setThumbnail(await bookImg(bookinfo));

			// create a button using discord.js message components
			const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
				new ButtonBuilder()
					.setLabel("Book Preview")
					.setStyle(5)
					.setURL(await bookLink(bookinfo))
					.setEmoji("<:BookBot:948892682032394240>"),
			);
			interaction.reply({ embeds: [embed], components: [row] });
		}
	},
});
