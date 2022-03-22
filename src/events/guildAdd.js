const Discord = require("discord.js");
const client = require("../index");
const { sendHook } = require("../utils/functions");

client.on("guildCreate", async (guild) => {
    await sendHook(
        process.env.GUILDLOGS,
        `Added to ${guild.name}`,
        `Guild ID: \`${guild.id}\` Guild Owner: \`${(await guild.fetchOwner()).user.tag}(${(await guild.fetchOwner()).user.id})\``,
        client.user.username,
        guild.iconURL({dynamic:true}),
    );
})