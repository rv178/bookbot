const { Client, Collection } = require("discord.js");
const dotenv = require("dotenv").config();
const client = new Client({
	intents: 32767,
});
module.exports = client;
client.slashCommands = new Collection();

require("./utils")(client);
client.login(process.env.TOKEN);
