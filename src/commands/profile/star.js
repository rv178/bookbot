const Discord = require("discord.js");
const Schema = require("../../models/profile.js");
const { getVolInfo, bookImg, bookAuthor } = require("../../utils/functions.js");

module.exports = {
	name: "star",
	description:
		"Add/remove a book from your starred list and list starred books.",
	options: [
		{
			name: "remove",
			description: "Remove a book from your favourites list.",
			type: "SUB_COMMAND",
			options: [
				{
					name: "book",
					description: "The book you wanna remove.",
					type: "STRING",
					required: true,
				},
			],
		},
		{
			name: "add",
			description: "Add a book to your favourites list.",
			type: "SUB_COMMAND",
			options: [
				{
					name: "book",
					description: "The book you wanna add.",
					type: "STRING",
					required: true,
				},
			],
		},
		{
			name: "list",
			description: "List your favourites books.",
			type: "SUB_COMMAND",
			options: [],
		},
	],

	run: async (client, interaction, args) => {
		const [subcommand] = args;
		const data = await Schema.findOne({ User: interaction.user.id });
		if (subcommand === "add") {
			const book = interaction.options.get("book").value;
			if (!data) {
				const firstembed = new Discord.MessageEmbed()
					.setAuthor({
						name: `Please pick a genre from /set-genre to start!`,
						iconURL: interaction.user.avatarURL({ dynamic: true }),
					})
					.setColor("BLUE");
				interaction.reply({ embeds: [firstembed] });
			}
			if (data) {
				if (data.Starred.includes(book)) {
					const star = new Discord.MessageEmbed()
						.setTitle("You have already starred this book.")
						.setColor("BLUE");
					interaction.reply({ embeds: [star] });
				} else {
					const bookInfo = await getVolInfo(book);
					const embed = new Discord.MessageEmbed()
						.setAuthor({
							name: `You have starred "${book}"`,
							iconURL: interaction.user.avatarURL({
								dynamic: true,
							}),
						})
						.setFooter({
							text: `Author: ` + (await bookAuthor(bookInfo)),
						})
						.setThumbnail(await bookImg(bookInfo))
						.setColor("BLUE");
					interaction.reply({ embeds: [embed] });
					data.Starred.push(book.toLowerCase());
					data.save();
				}
			}
		}
		if (subcommand === "remove") {
			const removebook = interaction.options.get("book-remove").value;
			if (data) {
				if (data.Starred.includes(removebook)) {
					const embed = new Discord.MessageEmbed()
						.setTitle(
							"You have removed this book from your favourites."
						)
						.setColor("BLUE");
					interaction.reply({ embeds: [embed] });
					data.Starred.splice(data.Starred.indexOf(removebook), 1);
					data.save();
				} else {
					const embed = new Discord.MessageEmbed()
						.setTitle("You have not starred this book.")
						.setColor("BLUE");
					interaction.reply({ embeds: [embed] });
				}
			}
		}
		if (subcommand === "list") {
			const embed = new Discord.MessageEmbed()
				.setTitle("Starred books:")
				.setColor("BLUE");
			if (data) {
				if (data.Starred.length === 0) {
					embed.setDescription(
						"`No starred books. Add one with /star add.`"
					);
				} else {
					embed.setDescription(
						data.Starred.map((book) => `\`⭐ ${book}\``).join("\n")
					);
				}
			} else {
				embed.setDescription(
					"`No starred books. Add one with /star add.`"
				);
			}
			interaction.reply({ embeds: [embed] });
		}
	},
};
