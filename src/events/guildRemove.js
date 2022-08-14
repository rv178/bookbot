const Discord = require("discord.js");
const client = require("../index");
const log = require("../utils/logger");

client.on("guildDelete", async (guild) => {

	const webhook = new Discord.WebhookClient({url: process.env.GUILDLOGS});
	const embed = new Discord.MessageEmbed()
	.setAuthor({name: `Removed from ${guild.name}`, iconURL: guild.iconURL({dynamic:true})})
	.setColor("#ff0000")
	.setTimestamp()
	.setFooter({text: `Currently in ${client.guilds.cache.size} servers`, iconURL: client.user.avatarURL({dynamic:true})})
	webhook.send({embeds: [embed]});
});
