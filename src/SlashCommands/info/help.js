const Discord = require('discord.js');
const { readdirSync } = require("fs");

module.exports = {
    name: 'help',
    description: 'This command will show you the list of commands.',
      options: [{
        name: "category",
        type: "STRING",
        description: "Enter a command category."
    }],
    run: async (client, interaction, args) => {
        const cat = readdirSync("./SlashCommands/")
        if(!args[0]) {
            const errEmbed = new Discord.MessageEmbed()
            .setTitle("Error")
            .setDescription(`Invalid command category, run \`/help\` without parameter to see the list of category.`)
            .setColor("RED")
            return interaction.followUp({ embeds: [errEmbed] })
       }
        const input_cat = interaction.options._hoistedOptions[0].value.toLowerCase()
        if (input_cat) {
            if(cat.includes(input_cat)) {
                let cmd_list = readdirSync(`./SlashCommands/${input_cat}`)
                for(x = 0; x < cmd_list.length; x++) cmd_list[x] = cmd_list[x].split("").slice(0, -3).join("")
                const embed = new Discord.MessageEmbed()
                .setTitle(`Command list: ${input_cat}`)
                .setDescription(`${cmd_list.join(", ")}`)
                .setColor("RANDOM")
                
                interaction.followUp({ embeds: [embed] })
            } else{
                const errEmbed = new Discord.MessageEmbed()
                .setTitle("Error")
                .setDescription(`Invalid command category, run \`/help\` without parameter to see the list of category.`)
                .setColor("RED")
                return interaction.followUp({ embeds: [errEmbed] })
            }

        }

        }  
}