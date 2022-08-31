const { Client, Collection } = require("discord.js");
require("dotenv").config();
const client = new Client({
	intents: ["GUILDS", "GUILD_MESSAGES"],
});
module.exports = client;
client.slashCommands = new Collection();
require("./src/utils")(client);
client.login(process.env.TOKEN);
