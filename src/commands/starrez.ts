import Command, { Permissions } from "../lib/command";

export default Command({
    names: ["starrez"],

    documentation:{
        description: "Returns the link to StarRez Housing.",
        group: "GENERAL",
        usage: "starrez",
    },

    check: Permissions.any(
        Permissions.channel("bot-commands"),
        Permissions.owner
    ),

    async fail(message){
        return message.channel.send(`In _#bot-commands_, please!`);
    },

    exec(message){
        return message.channel.send("https://starrez.clemson.edu/StarRezWeb");
    }
})