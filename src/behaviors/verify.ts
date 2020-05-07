import {
  Guild,
  GuildMember,
  DMChannel,
  GuildChannel,
  Message,
  MessageReaction,
  Channel,
  SystemChannelFlags,
  PartialGuildMember,
  User,
} from "discord.js";
import { client } from "../client";
const prompter = require("discordjs-prompter");

export default async function verify(member: GuildMember) {

  //defines for beginning of function
  let name, position, leadership, room, building, year;
  let isCD = false;
  const dm = await member.createDM();

  //send first message
  dm.send(
    "Greetings, and welcome to the Official Byrnes/Lever Team Discord Server! I'm AutoBLT, your friendly neighborhood Discord.js bot! To get started, I'll need some basic information."
  );

  //ask for name
  //"What is your name? (First name only, please!)",
  dm.send(`Thanks, ${name}.`);

  //ask for Leadership/RA role
  //"Are you _Leadership_ or _RA_?",
  

  //input validation - if invalid, ask again.
  while (position !== "leadership" && position !== "ra") {
    dm.send("I'm sorry, I didn't quite understand what you said.");
    //"Are you _Leadership_ or _RA_? (Type the role in italics that matches your position.)"
  }

  //nice
  //if leadership, then ask for role. Otherwise, it's an RA, so ask for their room and year.
  if (position === "LEADERSHIP") {
    //get if they're the grad or the community director
    dm.send("Leadership. Got it. Pleased to meet you!");
    //"Are you a _GCD_ or a _CD_?",

    //input validation - ask again if invalid
    while (leadership !== "CD" && leadership !== "GCD") {
      dm.send("I'm sorry, I didn't quite understand what you said.");
      //"Are you a _GCD_ or a _CD_? (Type the role in italics that matches your position.)"
    }

    //special message for dad and set isCD to true.
    if (leadership === "CD") {
      dm.send("Hello, Taylor.");
      isCD = true;
    }
  }
  else {
    dm.send("Ah, you're one of the RAs. Pleased to meet you!");
    //"What room are you in? _(e.g. 10A6, 3C6)_",
    dm.send(`Room: ${room}. Got it.`);

    //`Are you a _New RA_ or a _Returner_? (Type the role in italics that best describes you.)`

    //input validation for year
    while (year !== "NEW RA" && year !== "RETURNER") {
      dm.send("I'm sorry. I don't quite understand what you said.");
      //`Are you a _New RA_ or a _Returner_? (Type the role in italics that best describes you.)`
    }
  }

  //ask everyone but the CD for their building.
  if (isCD == false) {
    //"One more thing: _Byrnes_ or _Lever_?"
  }

  const roles = ["705916635839463434"]; //staff member role

  //add leadership or new/returner role
  if (position === "LEADERSHIP") roles.push("705915855636267089");
  //leadership role
  else {
    if (year === "RETURNER") roles.push("705917283620618341");
    //returner role
    else roles.push("705916699358265386"); //new RA role
  }

  //add byrnes or lever
  if (building === "BYRNES") roles.push("705916158376673352");
  //byrnes role
  else roles.push("705916508341141528"); //lever role

  //set nickname
  if (position === "LEADERSHIP" && isCD == true)
    member.setNickname(`${name} | CD`);
  else if (position === "LEADERSHIP" && isCD == false)
    member.setNickname(`${name} | ${building} GCD`);
  else member.setNickname(`${name} | ${building} ${room}`);

  //add roles
  member.roles.add(roles);

  dm.send(
    `Alright, you should be good to go! Get in touch with \`Zach | Byrnes 7A6\` if something looks wrong.`
  );
}
