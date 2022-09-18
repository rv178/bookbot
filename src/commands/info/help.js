const Discord = require("discord.js");
const { readdirSync } = require("fs");

module.exports = {
	name: "help",
	description: "Show the help menu.",
	run: async (client, interaction, args) => {
		let categories = [];

		readdirSync("./src/commands").forEach((dir) => {
			const commands = readdirSync(`./src/commands/${dir}/`).filter(
				(file) => file.endsWith(".js")
			);

			const cmds = commands.map((command) => {
				let file = require(`../../commands/${dir}/${command}`);

				if (!file.name) return "No command name.";

				let name = file.name.replace(".js", "");
				let description = file.description;

				return `\`${name}\` : ${description} \n`;
			});

			let data = new Object();

			data = {
				name: dir,
				value: cmds.length === 0 ? "In progress." : cmds.join(" "),
			};

			categories.push(data);
		});
		const row = new Discord.MessageActionRow().addComponents(
			new Discord.MessageButton()
				.setLabel("Support Server")
				.setStyle("LINK")
				.setURL("https://discord.gg/Kk4tSmQXUb")
				.setEmoji("<:BookBot:948892682032394240>"),

			new Discord.MessageButton()
				.setLabel("Invite")
				.setStyle("LINK")
				.setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=2147862592&scope=bot%20applications.commands`)
				.setEmoji("<:BookBot:948892682032394240>"),

			new Discord.MessageButton()
				.setLabel("GitHub")
				.setStyle("LINK")
				.setURL("https://github.com/rv178/BookBot")
				.setEmoji("<:BookBot:948892682032394240>"),
		);
		const embed = new Discord.MessageEmbed()
			.setTitle("Here are all of my commands:")
			.addFields(categories)
			.setDescription(`Use \`/help\`.`)
			.setTimestamp()
			.setColor("BLUE");

		return interaction.reply({ embeds: [embed], components: [row] });
	},
};
