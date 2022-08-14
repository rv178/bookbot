const Discord = require("discord.js");
const client = require("../index");
const { sendHook } = ("../utils/functions");
const log = require("../utils/logger");

client.on("guildCreate", async (guild) => {
	if(process.env.GUILDLOGS === undefined) return;
	const webhook = new Discord.WebhookClient({url: process.env.GUILDLOGS});
	const embed = new Discord.MessageEmbed()
	.setAuthor({name: `Added to ${guild.name}`, iconURL: guild.iconURL({dynamic:true})})
	.setColor("#ff0000")
	.setTimestamp()
	.setFooter({text: `Currently in ${client.guilds.cache.size} servers`, iconURL: client.user.avatarURL({dynamic:true})})
	webhook.send({embeds: [embed]});
});
