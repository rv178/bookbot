const Discord = require('discord.js');

module.exports = {
  name: 'invite',
  description: 'Invite me to your server!',
  run: async(client, interaction, args) => {
    const embed = new Discord.MessageEmbed()
        .setAuthor({name: `Invite me to your server!`, iconURL: client.user.avatarURL()})
        .setDescription(`[Invite me!](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=2147862592&scope=bot%20applications.commands )`)
        .setColor("BLUE");
    interaction.reply({embeds:[embed]});
  }
}