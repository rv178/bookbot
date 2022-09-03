import { CommandType } from "../typings/command";

export class Command {
	constructor(commandOptions: CommandType) {
		Object.assign(this, commandOptions);
	}
}
