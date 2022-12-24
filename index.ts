import * as dotenv from "dotenv";
import { Bot } from "./src/structures/client";

dotenv.config();

export const client = new Bot({
	intents: ["GUILDS", "GUILD_MESSAGES"],
});

client.start();
