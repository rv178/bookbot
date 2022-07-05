const Discord = require("discord.js");
const os = require("os");
module.exports = {
	name: "stats",
	description: "Returns statistics about the bot.",
	run: async (client, interaction, args) => {
		const cores = os.cpus().length;
		const cpuModel = os.cpus()[0].model;
		const usedram = (os.totalmem() - os.freemem()) / 1024 / 1024 / 1024;
		let totalSeconds = client.uptime / 1000;
		let days = Math.floor(totalSeconds / 86400);
		totalSeconds %= 86400;
		let hours = Math.floor(totalSeconds / 3600);
		totalSeconds %= 3600;
		let minutes = Math.floor(totalSeconds / 60);
		let seconds = Math.floor(totalSeconds % 60);
		const embed = new Discord.MessageEmbed()
			.setColor("#0099ff")
			.setTitle("BookBot Stats")
			.setThumbnail(client.user.avatarURL({ size: 1024 }))
			.addField(
				"Main Packages:",
				`\`Discord.js\` **${Discord.version}**\n\`Node.js\` **${
					process.versions.node
				}**\n\`Total packages\` **${
					Object.keys(require("../../../package.json").dependencies)
						.length
				}**`
			)
			.addField(
				"Server Specs:",
				`\`Operating System\` **${os.platform()}**\n\`CPU\` **${cpuModel}**\n\`Cores\` **${cores}**\n\`Total Ram\` **${(
					os.totalmem() /
					1024 /
					1024 /
					1024
				).toFixed(2)} GB**\n\`Used Ram\` **${usedram.toFixed(2)} GB**`
			)
			.addField(
				"Bot Stats:",
				`\`Uptime\` **${days}d ${hours}h ${minutes}m ${seconds}s**\n\`Guilds\` **${client.guilds.cache.size}**\n\`Users\` **${client.users.cache.size}**\n\`Channels\` **${client.channels.cache.size}**`
			)
			.addField(
				"GitHub",
				"[Click Me](https://github.com/rv178/bookbot)"
			)
			.setFooter({
				text: `Made by ${
					client.users.cache.get("403657714812715008").tag
				} & ${client.users.cache.get("758991567695642644").tag}`,
				iconURL: client.user.avatarURL(),
			});
		interaction.reply({ embeds: [embed] });
	},
};
