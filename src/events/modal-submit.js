const client = require("../index");
const Discord = require("discord.js");

client.on('interactionCreate', interaction => {
	if (!interaction.isModalSubmit()) return;
    if (interaction.customId === 'bugmodal') {
        interaction.reply({content: "Thank you for your report!"})
    }
		const bugreport = interaction.fields.getTextInputValue('bugreport');
		const embed = new Discord.MessageEmbed()
		.setTitle('Bug Report')
		.setDescription('```' + bugreport + '```')
		.setColor('#0099ff')
		.setFooter({text: interaction.user.tag + ' | ' + interaction.user.id, iconURL: interaction.user.avatarURL({dynamic:true})})
	
   const send = new Discord.WebhookClient({url: process.env.REPORTLOG});
    send.send({embeds: [embed], username:'Bug Report', avatarURL: client.user.avatarURL()});
   
});