const Discord = require("discord.js");

module.exports = {
	name: "eval",
	description: "Owner Only Command. Only the bot owners can use this command.",
    options: [{
        name: "code",
        type: "STRING",
        description: "The code you want to execute",
        required: true
    }],
	run: async (client, interaction, args) => {
        owners = [
            '403657714812715008',
            '758991567695642644',
        ]
    if (!owners.includes(interaction.user.id)) return interaction.reply("You are not allowed to use this command!")
        const clean = text => {
            if (typeof (text) === "string") return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203))
            else return text
        }
        try {
            const code = args.join(" ");
            let evaled = eval(code)
            if (typeof evaled !== "string") evaled = require("util").inspect(evaled)
            if (code) {
                let evaledembed = new Discord.MessageEmbed()
                    .setTimestamp()
                    .setDescription(`\`\`\`js\n${clean(evaled)}\`\`\``)
                    .setColor("BLUE")
                    interaction.reply({
                    embeds: [evaledembed]
                })
            } 

        } catch (err) {
            let erroreval = new Discord.MessageEmbed()
                .setColor("RED")
                .setTimestamp()
                .setDescription(`\`\`\`js\n${clean(err)}\`\`\``)

            interaction.reply({
                embeds: [erroreval]
            })

        }
    }
}