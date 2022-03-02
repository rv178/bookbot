const Discord = require(`discord.js`);
const { MessageActionRow, MessageSelectMenu } = require("discord.js");

module.exports = {
	name: "help",
	description: "BookBot help menu.",
	run: async (client, interaction, args) => {
		const embed = new Discord.MessageEmbed()
			.setColor("BLUE")
			.setTimestamp()
			.setFooter({
				text: interaction.user.tag,
				iconURL: interaction.user.avatarURL({ dynamic: true }),
			})
			.setTitle("BookBot help menu.")
			.setDescription("Categories:")
			.addField("Info", "`help`, `ping`")
			.addField("Books", "`search`");

		await interaction.editReply({
			embeds: [embed],
			ephemeral: false,
		});
	},
};
