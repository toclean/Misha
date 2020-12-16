import { Collection, Message } from 'discord.js';
import * as fs from 'fs';
import { resolve } from 'path';
import Command from '../Command';
import Misha from '../Misha';

export default class CommandHandler {
    public loaded: boolean = false;
    public readonly commands: Collection<string, Command> = new Collection();
    public readonly aliases: Collection<string, string> = new Collection();

    constructor(public client: Misha, private path: string) {

    }

    async load(): Promise<void> {
        const files = fs.readdirSync(this.path);

        let promises: Promise<any>[] = [];
        
        files.forEach(async (file) => {
            if (!file.includes('.map')) {
                const promise = import(resolve(this.path, file));
                promises.push(promise);
            }
        });

        const commands = await Promise.all(promises);
        for (let m of commands) {
            const command: Command = new m.default(this.client, this.path);

            // Ignore commands that are disabled
            if (command.conf.disabled) {
                this.client.logger.debug(`Skipped ${command.conf.name}!`);
                continue;
            }

            // Add the command and aliases
            this.commands.set(command.conf.name, command);
            command.conf.aliases.forEach((alias) => this.aliases.set(alias, command.conf.name));

            this.client.logger.debug(`Loaded ${command.conf.name}!`);
        }

        this.loaded = true;
    }

    handle(msg: Message): any {
        const args = msg.content.substring(this.client.prefix.length).trim().split(/ +/g);
        const cmd = args.shift()?.toLowerCase();

        const command = this.commands.get(cmd!) ?? this.commands.get(this.aliases.get(cmd!)!);
        if (!command) return undefined;

        command.execute(msg, args);
    }
}