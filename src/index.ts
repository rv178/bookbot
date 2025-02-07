import * as dotenv from "dotenv";
import { Bot } from "./structures/client"

dotenv.config();

export const client = new Bot({
	// intents: guilds (1) and guild messages (512)
	// https://discord-api-types.dev/api/discord-api-types-v10/enum/GatewayIntentBits#Guilds
	intents: [1, 512],
	shards: "auto",
});

client.start();
