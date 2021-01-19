import Command, {Permissions} from "../lib/command";
import {Channel, Guild, Message, TextChannel} from "discord.js";
import {client} from "../client";

export default Command({
    names:["send"],
    documentation:{
        description: "Under construction",
        group:"GENERAL",
        usage:"Under construction"
    },

    check: Permissions.owner,

    async fail(message:Message):Promise<Message>{
        return message.channel.send("Did you read the docs?");
    },

    async exec(message: Message, [...text]):Promise<Message>{
        let guildID:string = "709617496214470686";
        let guild:Guild = client.guilds.cache.get(guildID);

        let channelID:string = "709625575723237386";
        let channel:TextChannel = (
            guild.channels.cache.get(channelID)
        ) as TextChannel;

        let msg:string = message.content.substring(
            message.content.indexOf(" ") + 1,
            message.content.length
        );
        msg.concat("\n");

        return channel.send(msg + "\n");
    }
});