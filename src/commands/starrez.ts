import Command, {Permissions} from "../lib/command";

export default Command({
    names: ["starrez"],
    documentation:{
        description: "Returns the link to the StarRez website.",
        group: "GENERAL",
        usage: "starrez",
    },
    check: Permissions.all,
    exec(message){
        return message.channel.send("https://clemson.starrezhousing.com/StarRezWeb/");
    },
});