import {GuildMember, PartialGuildMember} from "discord.js";
import {askString, choose} from "../lib/prompt";

export default async function verify(member: GuildMember | PartialGuildMember) {

  console.log(`Started verification for ${member.id}`);
  
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
    //grad director or community director
    dm.send("Leadership. Got it. Pleased to meet you!");
    leadership = await choose(
      "Are you a _GCD_ or a _CD_? _(Type the role that best indicates your title.)_",
      dm,
      [["GCD"], ["CD"]]
    );

    //special message for dad
    if (leadership === "CD") {
      dm.send("Hello, Taylor. I'm excited for this year, and I hope you are too!");
      isCD = true;
    }
  }
  else {
    //Get RA room.
    dm.send("Ah, you're one of the RAs. Pleased to meet you!");
    room = await choose(
      "What room are you in? _(e.g. 10A6, 3C6)_",
      dm,
      [
        ["2A6"], ["3A6"], ["4A6"], ["5A6"], ["6A6"], ["7A6"], ["8A6"], ["9A6"], ["10A6"],
        ["2C6"], ["3C6"], ["4C6"], ["5C6"], ["6C6"], ["7C6"], ["8C6"], ["9C6"], ["10C6"],
      ]
    );
    dm.send(`Room: ${room}. Got it.`);

    //Get RA year
    year = await choose(
      "Are you a _New RA_ or a _Returner_? (Type the role in italics that best describes you.)",
      dm,
      [["RETURNER"], ["NEW RA"]]
    );
  }

  //ask everyone but the CD for their building.
  if (!isCD) {
    building = await choose("One more thing: _Byrnes_ or _Lever_?",
      dm,
      [["BYRNES"], ["LEVER"]]
    );
  }

  const roles = ["709625110285254699"]; //staff member role

  //add leadership or new/returner role
  if (position === "LEADERSHIP") roles.push("709623938040332340");
  //leadership role
  else {
    if (year === "RETURNER") roles.push("709624442803716138");
    //returner role
    else roles.push("709624623536275527"); //new RA role
  }

  //add byrnes or lever and prepare 'building' for nicknaming
  if (building === "BYRNES"){
    roles.push("709624172539805756"); //byrnes role
    building = "Byrnes";
  }
  else{
    roles.push("709624285173514240"); //lever role
    building = "Lever";
  }

  //set nickname
  if (position === "LEADERSHIP" && isCD == true)
    member.setNickname(`${name} | CD`);
  else if (position === "LEADERSHIP" && isCD == false)
    member.setNickname(`${name} | ${building} GCD`);
  else member.setNickname(`${name} | ${building} ${room}`);

  //add roles
  member.roles.add(roles);

  dm.send(
    `Alright, you should be good to go! Check to make sure you've got all the proper roles and the right nickname. If something looks wrong, be sure you get in contact with the Leadership Team to change/add any applicable information.`
  );
}