import Command, { Permissions } from "../lib/command";
import { makeEmbed } from "../lib/util";

export default Command({
  names: ["academic"],

  documentation: {
    description: "Returns the Fall 2020 Academic Calendar.",
    group: "GENERAL",
    usage: "academic",
  },

  check: Permissions.any(
    Permissions.channel("bot-commands"),
    Permissions.owner
  ),

  async fail(message){
    return message.channel.send(`In _#bot-commands_, please!`);
  },

  async exec(message) {
    const embed = makeEmbed(message)
      .setColor("#F56600")
      .setTitle("Fall 2020 Academic Calendar")
      .setURL(
        "https://www.clemson.edu/registrar/academic-calendars/calendars.html?year=2020&semester=fall"
      )
      .setDescription("Use *opdates for Housing Calendar.")
      .addFields(
        { name: "August 19", value: "Online classes begin" },
        { name: "August 25", value: "Last day to add a class" },
        {
          name: "September 1",
          value: "Last day to drop a class without a 'W'",
        },
        { name: "September 8", value: "December graduation applications due" },
        {
          name: "September 23",
          value: "In-Person, Hybrid, and Blended classes allowed"
        },
        { name: "October 9", value: "Midterm Evaluations Due" },
        {
          name: "October 23",
          value: "Last day to drop a class without a final grade",
        },
        { name: "November 2 - 3", value: "Fall break" },
        { name: "November 4", value: "Spring/Summer 2021 Registration begins" },
        { name: "November 25 - 27", value: "Thanksgiving Break" },
        { name: "December 7 - 11", value: "Campus Dead Days; Finals Week" },
        { name: "December 14", value: "Grades for graduates due" },
        { name: "December 16", value: "Final Grades due" },
        { name: "December 17", value: "December Graduation" }
      );

    return message.channel.send(embed);
  },
});