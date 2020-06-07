import Command, { Permissions } from "../lib/command";

export default Command({
    names: ["starrez"],

    documentation:{
        description: "Returns the link to StarRez Housing.",
        group: "GENERAL",
        usage: "starrez",
    },

    check: Permissions.all,

    exec(message){
        return message.channel.send("https://starrez.clemson.edu/StarRezWeb");
    }
})