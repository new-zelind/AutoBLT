import Command, { Permissions } from "../lib/command";
import { makeEmbed } from "../lib/util";

export default Command({
    names: ["about"],

    documentation:{
        description: "See a little more information about me!",
        group: "META",
        usage: "about",
    },

    check: Permissions.all,

    async exec(message){
        const embed = makeEmbed(message)
            .setColor("#3A4958")
            .setTitle("All about me, AutoBLT!")
            .setDescription("I'm glad you asked!")
            .addFields(
                {
                    name: "What is AutoBLT?",
                    value: "I am AutoBLT, a Discord.js application made specifically for this server!"
                },
                {
                    name: "Who made you?",
                    value: "I was created by Zach Lindler (CU B.S. CIS '21) and Brendan McGuire (CU B.S. CS '24) as a summer project. You can see my source code by using '*source'."
                },
                {
                    name: "What do you do?",
                    value: "Well, I can do a lot of things. I have a lot of call-and-response commands that you can use (try '*help' to see a list of these!). I make things easier and ensure that everything's working on the Discord Server!"
                },
                {
                    name: "Why AutoBLT? Why are you necessary?",
                    value: "Aww, that one kinda hurts. :( Anyway, Zach decided that he was tired of having to look up links to websites and other resources/tasks for the RA position, so he enlisted Brendan's help to program me. After all, most computer programs are made because their programmers are lazy."
                },
                {
                    name: "What if I find a bug?",
                    value: "If you notice something's not quite working right, please ping '@Zach | Byrnes 7A6' to let him know. He and Brendan will fix the bug as fast as possible to make sure I'm always performing at my best!"
                },
                {
                    name: "Anything else?",
                    value: "Yes, actually! I have three brothers, Vexbot, ByrnesBot, and eBeaver. Brendan programmed Vexbot for the VEX Robotics South Carolina Discord, and Zach programmed ByrnesBot and eBeaver for his floor and the Byrnes/Lever Discords, respectively. ByrnesBot is super uppity about everything, and Vexbot is just fun to heckle and pester. Me and eBeaver don't usually talk. I also have a soft spot for cake; it's a shame I can't eat."
                }
            );
        return message.channel.send(embed);
    }
})