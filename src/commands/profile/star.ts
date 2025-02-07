import { EmbedBuilder } from "discord.js";
import Schema from "../../models/profile";
import { bookAuthor, bookImg, getVolInfo } from "../../utils/functions";
import { Command } from "../../structures/command";

export default new Command({
	name: "star",
	description:
		"Add/remove a book from your starred list and list starred books.",
	options: [
		{
			name: "remove",
			description: "Remove a book from your favourites list.",
			type: 1,
			options: [
				{
					name: "book-to-remove",
					description: "The book you wanna remove.",
					type: 3,
					required: true,
				},
			],
		},
		{
			name: "add",
			description: "Add a book to your favourites list.",
			type: 1,
			options: [
				{
					name: "book-to-add",
					description: "The book you wanna add.",
					type: 3,
					required: true,
				},
			],
		},
		{
			name: "list",
			description: "List your favourites books.",
			type: 1,
			options: [],
		},
	],

	run: async ({ interaction, args }) => {
		const data = await Schema.findOne({ User: interaction.user.id });
		if (!interaction.isChatInputCommand()) return;

		if (interaction.options.getSubcommand() === "add") {
			const book = args.get("book-to-add").value;
			if (!data) {
				const firstembed = new EmbedBuilder()
					.setAuthor({
						name: "Please pick a genre from /set-genre to start!",
						iconURL: interaction.user.avatarURL(),
					})
					.setColor("Blue");
				interaction.reply({ embeds: [firstembed] });
			}
			if (data) {
				if (data.Starred.includes(book)) {
					const star = new EmbedBuilder()
						.setTitle("You have already starred this book.")
						.setColor("Blue");
					interaction.reply({ embeds: [star] });
				} else {
					const bookInfo = await getVolInfo(book.toString());
					const embed = new EmbedBuilder()
						.setDescription(`**You starred ${book}!**`)
						.setFooter({
							text: "Author: " + (await bookAuthor(bookInfo)),
						})
						.setThumbnail(await bookImg(bookInfo))
						.setColor("Blue");
					interaction.reply({ embeds: [embed] });
					data.Starred.push(book);
					data.save();
				}
			}
		}

		if (interaction.options.getSubcommand() === "remove") {
			const removebook = args.get("book-to-remove").value;
			console.log(removebook);
			if (data) {
				if (data.Starred.includes(removebook)) {
					const embed = new EmbedBuilder()
						.setTitle(
							"You have removed this book from your favourites.",
						)
						.setColor("Blue");
					interaction.reply({ embeds: [embed] });
					data.Starred.splice(data.Starred.indexOf(removebook), 1);
					data.save();
				} else {
					const embed = new EmbedBuilder()
						.setTitle("You have not starred this book.")
						.setColor("Blue");
					interaction.reply({ embeds: [embed] });
				}
			}
		}

		if (interaction.options.getSubcommand() === "list") {
			const embed = new EmbedBuilder()
				.setTitle("Starred books:")
				.setColor("Blue");
			if (data) {
				if (data.Starred.length === 0) {
					embed.setDescription(
						"`No starred books. Add one with /star add.`",
					);
				} else {
					embed.setDescription(
						data.Starred.map((book) => `\`⭐ ${book}\``).join("\n"),
					);
				}
			} else {
				embed.setDescription(
					"`No starred books. Add one with /star add.`",
				);
			}
			interaction.reply({ embeds: [embed] });
		}
	},
});
