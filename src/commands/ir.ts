import Command, { Permissions } from "../lib/command";
import { Message } from "discord.js";

export default Command({
    names: ["ir"],

    documentation:{
        description: "Returns a link to the Incident Reporting Form.",
        group: "GENERAL",
        usage: "ir",
    },

    check: Permissions.any(
        Permissions.channel("bot-commands"),
        Permissions.owner
    ),

    async fail(message:Message):Promise<Message>{
        return message.channel.send(`In _#bot-commands_, please!`);
    },

    async exec(message:Message):Promise<Message>{
        return message.channel.send(
            "**Incident Reporting link:**\nhttps://www.clemson.edu/campus-life/student-conduct/incidentreport.html"
        );
    },
});