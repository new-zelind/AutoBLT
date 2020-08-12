import Command, {Permissions} from "../lib/command";
import {Message} from "discord.js"

export default Command({
    names:["care"],
    documentation:{
        description: "Returns the link to file a CARE report.",
        group: "GENERAL",
        usage: "care"
    },

    check: Permissions.any(
        Permissions.channel("bot-commands"),
        Permissions.owner
    ),

    async fail (message:Message):Promise<Message>{
        return message.channel.send("In _bot-commands_, please!");
    },

    async exec (message:Message):Promise<Message>{
        return message.channel.send(
            "**CARE Report Link:**\nhttps://cm.maxient.com/reportingform.php?ClemsonUniv&layout_id=1"
        );
    }
})