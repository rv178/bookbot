const { Client, Collection } = require("discord.js");
const dotenv = require("dotenv").config();
const client = new Client({
	intents: 32767,
});
module.exports = client;
client.slashCommands = new Collection();

require("./utils")(client);
client.login(process.env.TOKEN);

// express api

const express = require("express");
const app = express();
require("./api/routes")(app);

app.get("/", function (req, res) {
	res.send("BookBot API");
});
app.get("*", function (req, res) {
	res.status(404).send("404 Moment");
});

app.listen(3000, () => {
	console.log("[!] API Server is up http://localhost:3000");
});
