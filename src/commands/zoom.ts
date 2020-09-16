import Command, {Permissions} from "../lib/command";
import {Message} from "discord.js";

export default Command({
    names: ["zoom"],

    documentation:{
        description: "Link to the staff meeting zoom call.",
        group: "GENERAL",
        usage: "zoom"
    },

    check:Permissions.any(
        Permissions.channel("bot-commands"),
        Permissions.owner
    ),

    async fail(message:Message):Promise<Message>{
        return message.channel.send("In _#bot-commands, please!");
    },

    async exec(message:Message):Promise<Message>{
        return message.channel.send("https://clemson.zoom.us/j/93206013146?pwd=MGdKbWluYkNOeFRRUk5VU2NMMnlBQT09");
    }
});