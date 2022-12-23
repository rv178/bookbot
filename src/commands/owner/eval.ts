import { MessageEmbed } from "discord.js";
import { Command } from "../../structures/command";

export default new Command({
	name: "eval",
	description: "Owner only command. only the bot owners can use this command.",
	options: [{
		name: "code",
		type: "STRING",
		description: "The code you want to execute",
		required: true,
	}],
	run: async ({ interaction, args }) => {
		const owners = [
			"403657714812715008",
			"758991567695642644",
		];
		if (!owners.includes(interaction.user.id)) {
			return interaction.reply("You are not allowed to use this command!");
		}
		const clean = async (text: string) => {
			if (typeof (text) === "string") {
				return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(
					/@/g,
					"@" + String.fromCharCode(8203),
				);
			} else return text;
		};
		try {
			const code = args.data.join(" ");
			let evaled = eval(code);
			if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
			if (code) {
				const evaledembed = new MessageEmbed()
					.setTimestamp()
					.setDescription(`\`\`\`js\n${clean(evaled)}\`\`\``)
					.setColor("BLUE");
				interaction.reply({
					embeds: [evaledembed],
				});
			}
		} catch (err) {
			const erroreval = new MessageEmbed()
				.setColor("RED")
				.setTimestamp()
				.setDescription(`\`\`\`js\n${clean(err)}\`\`\``);

			interaction.reply({
				embeds: [erroreval],
			});
		}
	},
});
