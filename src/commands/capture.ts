import Command, {Permissions} from "../lib/command";

export default Command({
    names: ["capture"],
    documentation:{
        description: "Returns the link to the time capturing website.",
        group: "GENERAL",
        usage: "capture",
    },
    check: Permissions.all,
    exec(message){
        return message.channel.send("https://hr.app.clemson.edu/tcs/s");
    },
});