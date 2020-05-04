import { MessageEmbed } from "discord.js";

export default {
  name: "academic",
  description: "The Fall 2020 Academic Calendar.",
  execute(msg, args) {
    const embed = new MessageEmbed()
      .setColor("#f66733")
      .setTitle("Fall 2020 Academic Calendar")
      .setURL(
        "https://www.clemson.edu/registrar/academic-calendars/calendars.html?year=2020&semester=fall"
      )
      .setDescription("Use *operational for Housing Calendar.")
      .addFields(
        { name: "August 17", value: "University Convocation" },
        { name: "August 19", value: "Classes begin" },
        { name: "August 25", value: "Last day to add a class" },
        {
          name: "September 1",
          value: "Last day to drop a class without a 'W'",
        },
        { name: "September 8", value: "December Graduation Applications Due" },
        { name: "October 9", value: "Midterm Evaluations Due" },
        {
          name: "October 23",
          value: "Last day to drop a class without a final grade",
        },
        { name: "November 2 - 3", value: "Fall break" },
        { name: "November 4", value: "Spring/Summer 2021 Registration begins" },
        { name: "November 25 - 27", value: "Thanksgivingn Break" },
        { name: "November 28", value: "Clemson vs. USC Jr. Football Game" },
        { name: "December 7 - 11", value: "Campus Dead Days; Finals Week" },
        { name: "December 14", value: "Grades for graduation due" },
        { name: "December 16", value: "Final Grades due" },
        { name: "December 17", value: "December Graduation" }
      )
      .setTimestamp()
      .setFooter("Invoked at:");

    msg.channel.send(embed);
  },
};
