import Command, { Permissions } from "../lib/command";

export default Command({
    names: ["report"],

    documentation:{
        description: "Returns a link to the Incident Reporting Form.",
        group: "GENERAL",
        usage: "report",
    },

    check: Permissions.any(
        Permissions.channel("bot-commands"),
        Permissions.owner
    ),

    async fail(message){
        return message.channel.send(`In _#bot-commands_, please!`);
    },

    exec(message){
        message.channel.send("**Incident Reporting link:**");
        message.channel.send("https://www.clemson.edu/campus-life/student-conduct/incidentreport.html");
    },
});