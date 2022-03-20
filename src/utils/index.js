const { glob } = require("glob");
const { promisify } = require("util");
const { Client } = require("discord.js");
const mongoose = require("mongoose");
const globPromise = promisify(glob);
const log = require("./logger");
const { sendHook } = require("./functions");
/**
 * @param {Client} client
 */
module.exports = async (client) => {
	mongoose
		.connect(process.env.MONGO, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => {
			log.info(`Connected to MongoDB`);
		})
		.catch((err) => {
			log.error("Error connecting to Mongo: ", err);
		});
	// Events
	const eventFiles = await globPromise(`${process.cwd()}/src/events/*.js`);
	eventFiles.map((value) => require(value));

	// Slash Commands
	const slashCommands = await globPromise(
		`${process.cwd()}/src/commands/*/*.js`
	);

	const arrayOfSlashCommands = [];
	slashCommands.map((value) => {
		const file = require(value);
		if (!file?.name) return;
		client.slashCommands.set(file.name, file);

		if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
		arrayOfSlashCommands.push(file);
	});
	client.on("ready", async () => {
		log.info("Loading application (/) commands.");
		for (cmd in arrayOfSlashCommands) {
			log.info(`Loaded command "${arrayOfSlashCommands[cmd].name}".`);
		}
		if (process.env.MODE == "TEST") {
			if (process.env.GUILD_ID) {
				log.warn("Running bot in development mode.");
				sendHook(process.env.UPTIMELOG, "Bookbot started", `**Started in development mode.**`, "Bookbot", client.user.avatarURL());
				log.info(`Setting slash commands in ${process.env.GUILD_ID}`);
				await client.guilds.cache
					.get(process.env.GUILD_ID)
					.commands.set(arrayOfSlashCommands);
			} else {
				log.error("Put a valid GUILD_ID in .env");
				process.exit();
			}
		} else if (process.env.MODE == "PROD") {
			log.warn("Running bot in production mode.");
			sendHook(process.env.UPTIMELOG, "Bookbot started", `**Started in production mode.**`, "Bookbot", client.user.avatarURL());
			await client.application.commands.set(arrayOfSlashCommands);
		} else {
			log.error("Put in a valid MODE in .env");
			process.exit();
		}

		// disable global cmds temp for testing
		//await client.application.commands.set(arrayOfSlashCommands);
		log.info("Finished loading application (/) commands.");

		process.on("uncaughtException", (err) => {
			log.error(err.stack)
			sendHook(process.env.ERRORLOG,"uncaughtException", "```" + err.stack + "```");
		});
	});
};
