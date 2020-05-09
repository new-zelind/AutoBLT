import Command, {Permissions}from "../lib/command";

export default Command({
    names: ["source"],

    documentation: {
        description: "Returns the github link to the source code, for nerds.",
        group: "META",
        usage: "source",
    },

    check: Permissions.all,
    exec(message){
        message.channel.send("**Here's my source code:**");
        message.channel.send("https://github.com/new-zelind/AutoBLT/");
    },
});