const { glob } = require("glob");
const { promisify } = require("util");
const { Client } = require("discord.js");

const globPromise = promisify(glob);

/**
 * @param {Client} client
 */
module.exports = async (client) => {
	// Events
	const eventFiles = await globPromise(`${process.cwd()}/events/*.js`);
	eventFiles.map((value) => require(value));

	// Slash Commands
	const slashCommands = await globPromise(
		`${process.cwd()}/SlashCommands/*/*.js`
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
		console.log("[*] Loading application (/) commands.");
		for (cmd in arrayOfSlashCommands) {
			console.log(
				`[!] Loaded command: "${arrayOfSlashCommands[cmd].name}".`
			);
		}
		await client.application.commands.set(arrayOfSlashCommands);
		console.log("[*] Finished loading application (/) commands.");
	});
};
