import { ChatInputApplicationCommandData, CommandInteraction, PermissionResolvable, GuildMember } from "discord.js";
import { Bot } from "../structures/client";

export interface ExtendedInteraction extends CommandInteraction {
	member: GuildMember;
}

interface RunOptions {
	client: Bot,
	interaction: CommandInteraction,
	args: any
}

type RunFunction = (options: RunOptions) => any;

export type CommandType = {
	userPermissions?: PermissionResolvable[];
	run: RunFunction;
} & ChatInputApplicationCommandData;
