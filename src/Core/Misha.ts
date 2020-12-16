import { Client, Message } from "discord.js";
import { resolve } from "path";

import { BOT_TOKEN } from '../creds';
import Command, { Medium } from "./Command";
import CommandHandler from "./Handlers/CommandHandler";
import MessageHandler from "./Handlers/MessageHandler";
import Logger from "./Logger";

export default class Misha extends Client {
    public logger = new Logger();
    public commandHandler = new CommandHandler(this, resolve(__dirname, "Commands"));
    public messageHandler = new MessageHandler();
    public prefix = ';';

    constructor() {
        super();
    }

    async build(): Promise<Misha> {
        this.on('ready', async () => {
            await this.commandHandler.load();
        });

        this.on('message', (msg: Message) => this.messageHandler.handle(msg, this));

        await this.login(BOT_TOKEN);

        return this;
    }

    async send(content: string, msg: Message, { conf: { medium } }: Command): Promise<Message> {
        this.logger.debug(`${content}`);

        if (medium === Medium.DM) {
            return await msg.author.send(content);
        } else {
            return await msg.reply(content);
        }
    }
}