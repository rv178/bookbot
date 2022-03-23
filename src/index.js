const { Client, Collection } = require("discord.js");
require("dotenv").config();
const client = new Client({
	intents: 32767,
});
const discordModals = require("discord-modals");
discordModals(client);
module.exports = client;
client.slashCommands = new Collection();
require("./utils")(client);
client.login(process.env.TOKEN);
