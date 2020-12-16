import { Message } from "discord.js";
import NotImplementedError from "./Errors/NotImplementedError";

export enum Medium {
    'DM',
    'CHANNEL'
}

interface Config {
    name: string;
    aliases: string[];
    disabled: boolean;
    medium: Medium;
}

export default class Command {
    constructor(public conf: Config) {

    }

    execute(msg: Message, args?: string[]): void {
        throw new NotImplementedError(`Command ${this.constructor.name} does not implement 'execute'!`);
    }
}