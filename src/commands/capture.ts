import Command, {Permissions} from "../lib/command";
import {Message} from "discord.js";

export default Command({
    names:["capture"],
    documentation:{
        description:"Submit your weekly 13.5 hours.",
        group:"GENERAL",
        usage:"capture"
    },

    check: Permissions.all,

    async exec(message:Message){
        return message.channel.send(
            "https://hr.app.clemson.edu/tcs/"
        );
    }
});