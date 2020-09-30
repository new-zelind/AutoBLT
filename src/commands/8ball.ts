import Command, {Permissions} from "../lib/command";
import {Message, MessageEmbed} from "discord.js";
import {makeEmbed} from "../lib/util";

const responses:string[] = [
    "It is certain.",
    "Without a doubt.",
    "You may rely on it.",
    "Yes, definitely.",
    "It is decidedly so.",
    "As I see it, yes.",
    "Most likely.",
    "Yes.",
    "Outlook good.",
    "Signs point to yes.",
    "Reply hazy, try again.",
    "Better not tell you now.",
    "Ask again later.",
    "Cannot predict now.",
    "Concentrate and ask again.",
    "Don't count on it.",
    "Outlook not so good.",
    "My sources say so.",
    "Very doubtful.",
    "My reply is no."
];

export default Command({
    names: ["8ball"],
    documentation:{
        description: "Ask the magic 8 Ball any yes/no question.",
        group: "META",
        usage: "8ball <question>"
    },

    check:Permissions.any(
        Permissions.channel("bot-commands"),
        Permissions.owner
    ),

    async fail(message:Message):Promise<Message>{
        return message.channel.send("In _#bot-commands, please!");
    },

    async exec(message:Message):Promise<Message>{
        const embed:MessageEmbed = makeEmbed(message)
            .setColor("#F56600")
            .setTitle("🎱 Says:")
            .setDescription(
                `***${responses[Math.floor(Math.random() * (responses.length - 1))]}***`
            );

        return message.channel.send(embed);
    }
})