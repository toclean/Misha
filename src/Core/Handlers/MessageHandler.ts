import { Message } from "discord.js";
import Misha from "../Misha";
import Handler from "./Handler";

export default class MessageHandler extends Handler {
    handle(msg: Message, client: Misha): void {
        const { author: { bot, tag }, content } = msg;

        if (bot) return;
        if (!content.startsWith(client.prefix)) return;

        // Log the message to console for debugging
        client.logger.debug(`${tag}: ${content}`);

        client.commandHandler.handle(msg);
    }
}