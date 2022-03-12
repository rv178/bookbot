const Discord = require('discord.js');
const Schema = require('../../models/profile.js');
module.exports = {
    name: 'set-genre',
    description: 'Set your favorite genre',
    options: [{
//https://canary.discord.com/channels/731532456724922459/823605956348608512/880410273561862195
            name: 'genre',
            type: 'STRING',
            description: 'The genre you want to set as your favorite genre',
            required: true,
            choices: [{
                name: 'action',
                value: 'action',
            },
            {
                name: 'autobiography',
                value: 'autobiography',
            },
            {
                name: 'biography',
                value: 'biography',
            },
            {
                name: 'business',
                value: 'business',
            },
            {
                name: 'crafts/hobbies',
                value: 'crafts/hobbies',
            },
            {
                name: 'classic',
                value: 'classic',
            },
            {
                name: 'cookbook',
                value: 'cookbook',
            },
            {
                name: 'comic',
                value: 'comic',
            },
            {
                name: 'diary',
                value: 'diary',
            },

            {
                name: 'drama',
                value: 'drama',
            },
            {
                name: 'fairytale',
                value: 'fairytale',
            },
            {
                name: 'fantasy',
                value: 'fantasy',
            },
            {
                name: 'fiction',
                value: 'fiction',
            },
            {
                name: 'folklore',
                value: 'folklore',
            },
            {
                name: 'horror',
                value: 'horror',
            },
            {
                name: 'humor',
                value: 'humor',
            },

            {
                name: 'magazine',
                value: 'magazine',
            },
  
            {
                name: 'mystery',
                value: 'mystery',
            },
            {
                name: 'nonfiction',
                value: 'nonfiction',
            },
            {
                name: 'poetry',
                value: 'poetry',
            },
            {
                name: 'programming',
                value: 'programming',
            },
            {
                name: 'religion',
                value: 'religion',
            },
            {
                name: 'romance',
                value: 'romance',
            },
            {
                name: 'science',
                value: 'science',
            },
            {
                name: 'scifi',
                value: 'scifi',
            },
               
            ],
        }
    ],
  run: async(client, interaction, args) => {
     const choice = interaction.options.get("genre").value;

     Schema.findOne({ User: interaction.user.id }, async(err, data) =>{
        if(err) client.logger.error(err);
        if(!data){
            const newUser = new Schema({
                User: interaction.user.id,
                Genre: choice
            })
            newUser.save().catch(err => console.log(err));
            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `Your favourite genre has been set to ${choice}`, iconURL: interaction.user.avatarURL({dynamic:true}) })
			.setColor("BLUE");
            interaction.followUp({ embeds: [embed] })
        }else{
            if(data){
              Schema.findOneAndDelete({ User: interaction.user.id })
              data = new Schema({
                User: interaction.user.id,
                Genre: choice
              })
              data.save().catch(err => console.log(err));
              const embed2 = new Discord.MessageEmbed()
              .setAuthor({ name: `Favourite genre updated to ${choice}`, iconURL: interaction.user.avatarURL({dynamic:true}) })
              .setColor("BLUE");
              interaction.followUp({embeds:[embed2]})
            }
        }
     })
  }
}