import {GuildMember, PartialGuildMember} from "discord.js";
import { client } from "../client";
import {askString, choose, questionValidate} from "../lib/prompt";

export default async function verify(member: GuildMember | PartialGuildMember) {

  //defines for beginning of function
  let name, position, leadership, room, building, year;
  let isCD = false;
  const dm = await member.createDM();

  //send first message
  dm.send(
    "Greetings, and welcome to the Official Byrnes/Lever Team Discord Server! I'm AutoBLT, your friendly neighborhood Discord.js bot! To get started, I'll need some basic information."
  );

  //ask for name
  name = await askString("What is your name? (First name only, please!)", dm);
  dm.send(`Thanks, ${name}.`);

  //ask for Leadership/RA role
  position = await choose("Are you _Leadership_ or _RA_?", dm, [["LEADERSHIP"], ["RA"]]);
  
  //if leadership, then ask for role. Otherwise, it's an RA, so ask for their room and year.
  if (position === "LEADERSHIP") {
    //get if they're the grad or the community director
    dm.send("Leadership. Got it. Pleased to meet you!");
    leadership = await choose(
      "Are you a _GCD_ or a _CD_? _(Type the role that best indicates your title.)_",
      dm,
      [["GCD"], ["CD"]]
    );

    //special message for dad
    if (leadership === "CD") {
      dm.send("Hello, Taylor.");
      isCD = true;
    }
  }
  else {
    dm.send("Ah, you're one of the RAs. Pleased to meet you!");
    room = await askString("What room are you in? _(e.g. 10A6, 3C6)_", dm);
    dm.send(`Room: ${room}. Got it.`);

    year = await choose(
      "Are you a _New RA_ or a _Returner_? (Type the role in italics that best describes you.)",
      dm,
      [["RETURNER"], ["NEW RA"]]
    );
  }

  //ask everyone but the CD for their building.
  if (isCD == false) {
    building = await choose("One more thing: _Byrnes_ or _Lever_?",
      dm,
      [["BYRNES"], ["LEVER"]]
    );
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