const Discord = require("discord.js");
const Schema = require("../../models/profile.js");
const { getVolInfo, bookImg, bookAuthor } = require("../../utils/functions.js");
// to do get both sub commands working idk why it isnt working
module.exports = {
	name: "star",
	description: "Add a book to your favourites list.",
	options: [
		{
			type: "SUB_COMMAND",
			name: "add",
			description: "Add a book to your favourites list.",
			options: [
				{
					type: "STRING",
					name: "book",
					description: "The book you want to add.",
					required: true,
				},
			],
			type: "SUB_COMMAND",
			name: "remove",
			description: "Remove a book from your favourites list.",
			options: [
				{
					type: "STRING",
					name: "book-remove",
					description: "The book you want to remove.",
					required: true,
				},
			],
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
	},
};
