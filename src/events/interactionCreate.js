const client = require("../index");
const { sendHook } = require("../utils/functions");

client.on("interactionCreate", async (interaction) => {
    if (interaction.isCommand()) {
        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd)
            return interaction.reply({ content: "An error has occured " });

        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        interaction.member = interaction.guild.members.cache.get(interaction.user.id);

        cmd.run(client, interaction, args);
    }

    // Context Menu Handling
    if (interaction.isContextMenu()) {
        await interaction.deferReply({ ephemeral: false });
        const command = client.slashCommands.get(interaction.commandName);
        if (command) command.run(client, interaction);
    }
});

client.on('modalSubmit', async (modal) => {
  if(modal.customId === 'bugreport'){
    const firstResponse = modal.getTextInputValue('bugreport-txt')
    modal.reply('Thank you for your report!')
    sendHook(process.env.UPTIMELOG, "Bug Report", `${firstResponse}`, modal.user.tag + " (" + modal.user.id + ")", modal.user.avatarURL({dynamic:true}))
  }  
});