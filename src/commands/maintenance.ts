import Command, {Permissions} from "../lib/command";
import {Message} from "discord.js";

export default Command({
    names:["maintenance"],
    documentation:{
        description: "Link to submit a maintenance request",
        usage: "maintenance",
        group: "GENERAL"
    },

    check: Permissions.any(
        Permissions.channel("bot-commands"),
        Permissions.owner
    ),

    async fail(message:Message):Promise<Message>{
        return message.channel.send("In _#bot-commands, please!");
    },

    async exec(message:Message):Promise<Message>{
        return message.channel.send(
            "https://cufacilities.sites.clemson.edu/services/service-request"
        );
    }
})