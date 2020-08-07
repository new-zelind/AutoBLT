import Command, { Permissions }from "../lib/command";

export default Command({
    names: ["source"],

    documentation: {
        description: "Returns the github link to the source code, for nerds.",
        group: "META",
        usage: "source",
    },

    check: Permissions.any(
        Permissions.channel("bot-commands"),
        Permissions.owner
    ),

    async fail(message){
        return message.channel.send(`In _#bot-commands_, please!`);
  } ,

    exec(message){
        let msg:string = "**Here's my source code:**\nhttps://github.com/new-zelind/AutoBLT/";
        if(Math.random() >= 0.95) msg += "\n_Be sure to star the repository!_";

        return message.channel.send(msg);
    },
});