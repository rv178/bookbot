import * as dotenv from "dotenv";
import { Bot } from "./structures/client"

dotenv.config();

export const client = new Bot({
	intents: ["GUILDS", "GUILD_MESSAGES"],
	shards: "auto",
});

client.start();
