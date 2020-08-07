import Command, {Permissions} from "../lib/command";
import {Message} from "discord.js";

export default Command({
    names:["capture"],
    documentation:{
        description:"Submit your weekly 13.5 hours.",
        group:"GENERAL",
        usage:"capture"
    },

    check: Permissions.any(
        Permissions.channel("bot-commands"),
        Permissions.owner
    ),

    async fail(message){
        return message.channel.send(`In _#bot-commands_, please!`);
    },

    async exec(message:Message){
        return message.channel.send(
            "**Time Capture Tool:**\nhttps://hr.app.clemson.edu/tcs/"
        );
    }
});