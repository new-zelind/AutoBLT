import Command, {Permissions} from "../lib/command";
import {Message, MessageEmbed} from "discord.js";
import { makeEmbed } from "../lib/util";

export default Command({
    names:["opdates"],
    documentation:{
        description: "See the 20-21 Housing calendar",
        group: "GENERAL",
        usage: "opdates"
    },

    check: Permissions.any(
        Permissions.channel("bot-commands"),
        Permissions.owner
    ),

    async fail(message:Message):Promise<Message>{
        return message.channel.send(`In _#bot-commands_, please!`);
    },

    async exec(message:Message):Promise<Message>{
        const embed:MessageEmbed = makeEmbed(message)
            .setColor("#522D80")
            .setTitle("Housing Operational Dates")
            .setDescription("Use *academic for Academic Calendar")
            .addFields(
                {
                    name: "August 9 - 14",
                    value: "Remote RA Training",
                    inline: true
                },
                {
                    name: "September 5",
                    value: "RA Move-In",
                    inline: true
                },
                {
                    name: "September 6 - 10",
                    value: "RA Teambuilding / Building Prep",
                    inline: true
                },
                {
                    name: "September ???",
                    value: "Resident Move-In",
                    inline: true
                },
                {
                    name: "November 2 - 3",
                    value: "Fall Break On-Call",
                    inline: true
                },
                {
                    name: "November 12 - 13",
                    value: "Development Day 1",
                    inline: true
                },
                {
                    name: "November 25 - 27",
                    value: "Thanksgiving Break On-Call",
                    inline: true
                },
                {
                    name: "December 12",
                    value: "Housing Closes for Winter Break",
                    inline: true
                },
                {
                    name: "December 13",
                    value: "Traditional Housing RAs may Leave for Winter Break w/ Supervisors' Approval",
                    inline: true
                },
                {
                    name: "December 18",
                    value: "Upperclassman Housing RAs may Leave for Winter Break w/ Supervisors' Approval",
                    inline: true
                },
                {
                    name: "December 18 - January 1",
                    value: "Winter Break On-Call",
                    inline: true
                },
                {
                    name: "January 1",
                    value: "RA Move-In for Spring Semester",
                    inline: true
                },
                {
                    name: "January 2",
                    value: "Desk + On Call Schedules Resume",
                    inline: true
                },
                {
                    name: "January 3 - 4",
                    value: "Spring RA Training",
                    inline: true
                },
                {
                    name: "January 5",
                    value: "Development Day 2",
                    inline: true
                },
                {
                    name: "January 8 - 10",
                    value: "Mandatory Community Presence for All RAs",
                    inline: true
                },
                {
                    name: "January 18",
                    value: "Desks Closed",
                    inline: true
                },
                {
                    name: "February 11 - 12",
                    value: "Development Day 3",
                    inline: true
                },
                {
                    name: "March 15 - 19",
                    value: "Spring Break On-Call",
                    inline: true
                },
                {
                    name: "March 25 - 26",
                    value: "Development Day 4",
                    inline: true
                },
                {
                    name: "April 30 - May 2",
                    value: "Summer Move-Out; Mandatory Community Presence",
                    inline: true
                },
                {
                    name: "May 2",
                    value: "Housing Closes for Summer; RAs may Leave for Summer Break w/ Supervisor' Approval",
                    inline: true
                }
            );

        return message.channel.send(embed);
    }
});