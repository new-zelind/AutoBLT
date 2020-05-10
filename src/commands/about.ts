import Command, {Permissions} from "../lib/command";
import {makeEmbed} from "../lib/util";

export default Command({
    names: ["about"],
    documentation: {
        description: "All about AutoBLT.",
        group: "META",
        usage: "about",
    },
    check: Permissions.all,
    exec(message){
        const embed = makeEmbed(message)
            .setColor("#109DC0")
            .setTitle("About AutoBLT:")
            .setDescription(
                "Use *help for command help and *source for the source code."
            )
            .addFields(
                {
                    name: "What is AutoBLT?",
                    value: "I, AutoBLT, am a Discord.js application made specifically for the Byrnes/Lever Team Discord Server, but I can be implemented on other RA staff Discord servers around Clemson Housing. I am a resource bot that allows staff members to easily access supporting documentation and links, as well as other information pertainent to the RA position."
                },
                {
                    name: "What can AutoBLT do?",
                    value: "I can do a lot of things! Try sending *help in #bot-commands to see what all I can do."
                },
                {
                    name: "Who\'s the mad genius behind this?",
                    value: "I was created by Zach Lindler and Brendan McGuire. Zach Lindler (B.S. CIS '21) and Brendan McGuire (B.S. CS '24) are School of Computing students at Clemson University who programmed me from scratch in the summer of 2020.",
                },
                {
                    name: "What happens if AutoBLT breaks, or I find a bug?",
                    value: "If something happens, it's not my fault. See if you can get in contact with Zach (Segfault#2289 / zelindl@g.clemson.edu / github.com/new-zelind) to report a bug."
                },
                {
                    name: "Anthing else?",
                    value: "Yes! I have two brothers, Vexbot and ByrnesBot, who are both moderation bots. I am the youngest; my oldest brother, Vexbot, was made for the VEX Robotics Teams of South Carolina Discord server. ByrnesBot was made for Zach's Floor Discords for his residents. (They're great, but kinda annoying if you ask me.)"
                }
            );
        return message.channel.send(embed);
    },
});