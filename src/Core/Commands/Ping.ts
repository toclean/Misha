import { Message, MessageEmbed } from "discord.js";
import Misha from "../Misha";
import Command, { Medium } from "../Command";

export default class Ping extends Command {
    constructor(public readonly misha: Misha) {
        super(
            {
                name: 'ping',
                aliases: [],
                disabled: false,
                medium: Medium.CHANNEL
            }
        );
    }

    async execute(msg: Message): Promise<Message> {
        const before = Date.now();

        await this.misha.send("*🏓 Pinging...*", msg, this).then((message: Message) => {
            const latency = Date.now() - before;
            const wsLatency = this.misha.ws.ping.toFixed(0);
            const embed = new MessageEmbed()
                .setAuthor("🏓 PONG!", message.client.user?.displayAvatarURL())
                .setColor(this.searchHex(wsLatency))
                .addFields({
                    name: "API Latency",
                    value: `**\`${latency}\`** ms`,
                    inline: true
                }, {
                    name: "WebSocket Latency",
                    value: `**\`${wsLatency}\`** ms`,
                    inline: true
                })
                .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL())
                .setTimestamp();

            message.edit(embed)
            message.edit("");

            this.misha.logger.debug(`API Latency: ${latency}ms\tWebSocket Latency: ${wsLatency}ms`);
        });

        return msg;
    }
    
    private searchHex(ms: string | number): string | number {
        const listColorHex = [
            [0, 20, "#0DFF00"],
            [21, 50, "#0BC700"],
            [51, 100, "#E5ED02"],
            [101, 150, "#FF8C00"],
            [150, 200, "#FF6A00"]
        ];

        const defaultColor = "#FF0D00";

        const min = listColorHex.map(e => e[0]);
        const max = listColorHex.map(e => e[1]);
        const hex = listColorHex.map(e => e[2]);
        let ret: string | number = "#000000";

        for (let i = 0; i < listColorHex.length; i++) {
            if (min[i] <= ms && ms <= max[i]) {
                ret = hex[i];
                break;
            } else {
                ret = defaultColor;
            }
        }
        return ret;
    }
}